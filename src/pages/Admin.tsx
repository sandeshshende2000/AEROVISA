import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  CheckCircle2, 
  XCircle, 
  MessageSquare, 
  MapPin, 
  LogOut, 
  ShieldCheck, 
  Trash2 
} from 'lucide-react';
import { db, auth, googleProvider } from '../firebase';
import { signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import { 
  collection, 
  query, 
  onSnapshot, 
  orderBy, 
  doc, 
  updateDoc, 
  addDoc, 
  deleteDoc,
  Timestamp 
} from 'firebase/firestore';

const ADMIN_EMAIL = 'sandeshshende2000@gmail.com';

const AdminPage = () => {
  const [user, setUser] = useState<any>(null);
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'submissions' | 'inquiries'>('submissions');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && user.email === ADMIN_EMAIL) {
        setUser(user);
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) return;

    const qSub = query(collection(db, 'propertySubmissions'), orderBy('createdAt', 'desc'));
    const unsubscribeSub = onSnapshot(qSub, (snapshot) => {
      setSubmissions(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    const qInq = query(collection(db, 'propertyInquiries'), orderBy('createdAt', 'desc'));
    const unsubscribeInq = onSnapshot(qInq, (snapshot) => {
      setInquiries(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    return () => {
      unsubscribeSub();
      unsubscribeInq();
    };
  }, [user]);

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  const handleLogout = () => signOut(auth);

  const handleApprove = async (submission: any) => {
    try {
      // 1. Add to approvedProperties
      await addDoc(collection(db, 'approvedProperties'), {
        propertyType: submission.propertyType,
        location: submission.location,
        price: submission.price,
        description: submission.description,
        imageUrl: submission.imageUrl,
        features: ['Global Exposure', 'Verified Listing'], // Default features
        createdAt: Timestamp.now()
      });

      // 2. Update status in propertySubmissions
      await updateDoc(doc(db, 'propertySubmissions', submission.id), {
        status: 'approved'
      });
    } catch (error) {
      console.error('Approval failed', error);
    }
  };

  const handleReject = async (id: string) => {
    try {
      await updateDoc(doc(db, 'propertySubmissions', id), {
        status: 'rejected'
      });
    } catch (error) {
      console.error('Rejection failed', error);
    }
  };

  const handleDeleteInquiry = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this inquiry?')) {
      try {
        await deleteDoc(doc(db, 'propertyInquiries', id));
      } catch (error) {
        console.error('Deletion failed', error);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-navy-950 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-gold-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-navy-950 flex flex-col items-center justify-center p-4">
        <div className="max-w-md w-full bg-navy-900 border border-gold-500/20 p-8 text-center">
          <ShieldCheck size={64} className="text-gold-500 mx-auto mb-6" />
          <h1 className="text-3xl font-display font-bold text-white mb-4">Admin Access</h1>
          <p className="text-slate-400 mb-8">Please sign in with an authorized administrator account to manage global listings and inquiries.</p>
          <button 
            onClick={handleLogin}
            className="w-full bg-gold-500 hover:bg-gold-600 text-navy-950 py-4 font-bold uppercase tracking-widest transition-all"
          >
            Sign In with Google
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 min-h-screen bg-navy-950 px-4 sm:px-6 lg:px-8 pb-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div>
            <h1 className="text-4xl font-display font-bold text-white mb-2 uppercase tracking-wider">AeroVisa Admin</h1>
            <p className="text-slate-400">Manage property submissions and client inquiries.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-white font-bold text-sm">{user.displayName}</p>
              <p className="text-slate-500 text-xs">{user.email}</p>
            </div>
            <button 
              onClick={handleLogout}
              className="p-3 bg-navy-800 border border-slate-700 text-slate-400 hover:text-white hover:border-gold-500 transition-all rounded-sm"
              title="Logout"
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-800 mb-8">
          <button 
            onClick={() => setActiveTab('submissions')}
            className={`px-8 py-4 font-bold uppercase tracking-widest text-sm transition-all relative ${activeTab === 'submissions' ? 'text-gold-500' : 'text-slate-500 hover:text-slate-300'}`}
          >
            Submissions ({submissions.length})
            {activeTab === 'submissions' && <motion.div layoutId="tab" className="absolute bottom-0 left-0 right-0 h-1 bg-gold-500" />}
          </button>
          <button 
            onClick={() => setActiveTab('inquiries')}
            className={`px-8 py-4 font-bold uppercase tracking-widest text-sm transition-all relative ${activeTab === 'inquiries' ? 'text-gold-500' : 'text-slate-500 hover:text-slate-300'}`}
          >
            Inquiries ({inquiries.length})
            {activeTab === 'inquiries' && <motion.div layoutId="tab" className="absolute bottom-0 left-0 right-0 h-1 bg-gold-500" />}
          </button>
        </div>

        {/* Content */}
        <div className="space-y-6">
          {activeTab === 'submissions' ? (
            submissions.length === 0 ? (
              <div className="text-center py-20 bg-navy-900 border border-slate-800">
                <p className="text-slate-500">No property submissions found.</p>
              </div>
            ) : (
              submissions.map((sub) => (
                <motion.div 
                  key={sub.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-navy-900 border border-slate-800 p-6 flex flex-col lg:flex-row gap-8"
                >
                  <div className="w-full lg:w-64 h-48 flex-shrink-0 overflow-hidden bg-navy-800">
                    <img 
                      src={sub.imageUrl} 
                      alt={sub.propertyType} 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="text-xl font-display font-bold text-white">{sub.propertyType} in {sub.location}</h3>
                          <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-sm ${
                            sub.status === 'approved' ? 'bg-green-500/10 text-green-500' : 
                            sub.status === 'rejected' ? 'bg-red-500/10 text-red-500' : 
                            'bg-gold-500/10 text-gold-500'
                          }`}>
                            {sub.status}
                          </span>
                        </div>
                        <p className="text-slate-500 text-sm flex items-center gap-1">
                          <MapPin size={14} className="text-gold-500" /> {sub.location}
                        </p>
                      </div>
                      <div className="text-gold-500 font-bold text-xl">{sub.price}</div>
                    </div>
                    
                    <p className="text-slate-400 text-sm mb-6 line-clamp-2">{sub.description}</p>
                    
                    <div className="grid sm:grid-cols-2 gap-4 mb-6 p-4 bg-navy-950/50 border border-slate-800 rounded-sm">
                      <div>
                        <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-1">Owner Info</p>
                        <p className="text-white text-sm font-medium">{sub.name}</p>
                        <p className="text-slate-400 text-xs">{sub.email}</p>
                        <p className="text-slate-400 text-xs">{sub.phone}</p>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-1">Submitted On</p>
                        <p className="text-white text-sm">{sub.createdAt?.toDate().toLocaleDateString()}</p>
                        <p className="text-slate-400 text-xs">{sub.createdAt?.toDate().toLocaleTimeString()}</p>
                      </div>
                    </div>

                    {sub.status === 'pending' && (
                      <div className="flex gap-4">
                        <button 
                          onClick={() => handleApprove(sub)}
                          className="flex-grow bg-green-600 hover:bg-green-700 text-white py-3 font-bold uppercase tracking-widest text-xs transition-all flex items-center justify-center gap-2"
                        >
                          <CheckCircle2 size={16} /> Approve Listing
                        </button>
                        <button 
                          onClick={() => handleReject(sub.id)}
                          className="flex-grow border border-red-500/50 text-red-500 hover:bg-red-500 hover:text-white py-3 font-bold uppercase tracking-widest text-xs transition-all flex items-center justify-center gap-2"
                        >
                          <XCircle size={16} /> Reject
                        </button>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))
            )
          ) : (
            inquiries.length === 0 ? (
              <div className="text-center py-20 bg-navy-900 border border-slate-800">
                <p className="text-slate-500">No property inquiries found.</p>
              </div>
            ) : (
              inquiries.map((inq) => (
                <motion.div 
                  key={inq.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-navy-900 border border-slate-800 p-6"
                >
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gold-500/10 flex items-center justify-center rounded-sm">
                        <MessageSquare className="text-gold-500" size={24} />
                      </div>
                      <div>
                        <h3 className="text-xl font-display font-bold text-white">{inq.name}</h3>
                        <p className="text-slate-500 text-sm">{inq.email} | {inq.phone}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-slate-500 text-xs uppercase tracking-widest font-bold mb-1">Received On</p>
                      <p className="text-white text-sm">{inq.createdAt?.toDate().toLocaleDateString()}</p>
                    </div>
                  </div>
                  
                  <div className="bg-navy-950 p-4 border border-slate-800 rounded-sm mb-6">
                    <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-2">Message</p>
                    <p className="text-slate-300 text-sm leading-relaxed">{inq.message || 'No message provided.'}</p>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="text-xs text-slate-500">
                      Property ID: <span className="text-gold-500">{inq.propertyId}</span>
                    </div>
                    <button 
                      onClick={() => handleDeleteInquiry(inq.id)}
                      className="text-red-500 hover:text-red-400 transition-colors p-2"
                      title="Delete Inquiry"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </motion.div>
              ))
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
