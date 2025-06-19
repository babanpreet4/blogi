import React, { useEffect, useState, useMemo, useRef } from "react";
import api from "../api";
import { FiEdit2, FiTrash2, FiPlus, FiX, FiCheck, FiClock, FiRefreshCw, FiSearch } from "react-icons/fi";
import { FaPenFancy, FaChartBar, FaFileWord } from "react-icons/fa";
import { BsBodyText } from "react-icons/bs";

// --- Enhanced Color Palette ---
const colors = {
  primary: '#6C63FF',
  secondary: '#4F46E5',
  accent: '#10B981',
  background: '#F9FAFB',
  card: '#FFFFFF',
  text: '#1F2937',
  textLight: '#6B7280',
  error: '#EF4444',
  success: '#10B981',
  border: '#E5E7EB',
  // Unique colors for stat cards
  accentBlue: '#3B82F6',
  accentGreen: '#10B981',
  accentAmber: '#F59E0B',
};

// --- UNIQUELY ENHANCED Dashboard Styles (Step 1: Define without self-references) ---
const styles = {
  // Page Layout
  pageContainer: {
    backgroundColor: colors.background,
    minHeight: '100vh',
    padding: '2rem',
    fontFamily: "'Inter', sans-serif",
  },
  dashboardLayout: {
    display: 'grid',
    gridTemplateColumns: 'minmax(350px, 400px) 1fr',
    gap: '2.5rem',
    maxWidth: '1600px',
    margin: '0 auto',
    '@media (max-width: 1200px)': {
      gridTemplateColumns: '1fr',
    },
  },

  // Left Panel - Form
  leftPanel: {
    backgroundColor: colors.card,
    borderRadius: '20px',
    padding: '2rem',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.07)',
    position: 'sticky',
    top: '2rem',
    height: 'fit-content',
    '@media (max-width: 1200px)': {
      position: 'relative',
      top: 0,
    },
  },
  panelHeader: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '2rem',
  },
  panelIcon: {
    background: `linear-gradient(45deg, ${colors.primary}, ${colors.secondary})`,
    color: 'white',
    borderRadius: '16px',
    padding: '0.75rem',
    marginRight: '1rem',
    fontSize: '1.75rem',
    boxShadow: `0 4px 12px rgba(108, 99, 255, 0.3)`,
  },
  panelTitle: {
    fontSize: '1.75rem',
    fontWeight: 700,
    color: colors.text,
    margin: 0,
  },

  // Form Elements
  form: { display: 'flex', flexDirection: 'column', gap: '1.5rem' },
  inputGroup: { display: 'flex', flexDirection: 'column', gap: '0.5rem' },
  label: { fontSize: '0.9rem', fontWeight: 600, color: colors.textLight },
  input: { padding: '0.75rem 1rem', borderRadius: '8px', border: `1px solid ${colors.border}`, fontSize: '1rem', transition: 'all 0.2s ease' },
  textarea: { minHeight: '150px', resize: 'vertical', fontFamily: 'inherit' },
  buttonGroup: { display: 'flex', gap: '1rem', marginTop: '0.5rem' },
  button: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '0.75rem 1.5rem', borderRadius: '8px', border: 'none', fontSize: '1rem', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s ease' },
  primaryButton: { backgroundColor: colors.primary, color: 'white', '&:hover': { backgroundColor: colors.secondary, transform: 'translateY(-2px)', boxShadow: `0 4px 12px rgba(108, 99, 255, 0.3)` } },
  secondaryButton: { backgroundColor: 'transparent', color: colors.textLight, border: `1px solid ${colors.border}`, '&:hover': { backgroundColor: '#F9FAFB', borderColor: '#D1D5DB' } },

  // Right Panel
  rightPanel: { display: 'flex', flexDirection: 'column', gap: '2rem' },
  statsContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
    gap: '1.5rem',
  },
  statCard: {
    backgroundColor: colors.card,
    borderRadius: '16px',
    padding: '1.5rem',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
    display: 'flex',
    gap: '1rem',
    transition: 'all 0.2s ease',
    '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)' },
  },
  statIcon: {
    fontSize: '1.25rem',
    color: 'white',
    width: '48px',
    height: '48px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statContent: { display: 'flex', flexDirection: 'column', justifyContent: 'center' },
  statValue: { fontSize: '1.75rem', fontWeight: 700, color: colors.text, margin: 0 },
  statLabel: { fontSize: '0.9rem', color: colors.textLight, margin: 0 },

  // Right Panel Header
  rightPanelHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '1rem',
    paddingBottom: '1rem',
    borderBottom: `1px solid ${colors.border}`,
  },
  searchContainer: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  },
  searchIcon: {
    position: 'absolute',
    left: '1rem',
    color: colors.textLight,
    fontSize: '1.25rem',
  },
  searchInput: {
    padding: '0.75rem 1rem 0.75rem 3rem',
    borderRadius: '8px',
    border: `1px solid ${colors.border}`,
    fontSize: '1rem',
    width: '300px',
    transition: 'all 0.2s ease',
  },
  
  // Post List & Items
  postList: { display: 'flex', flexDirection: 'column', gap: '1rem' },
  postItem: {
    backgroundColor: colors.card,
    borderRadius: '16px',
    padding: '1.5rem',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
    transition: 'all 0.2s ease',
    '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)' },
  },
  postHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' },
  postTitle: { fontSize: '1.25rem', fontWeight: 600, color: colors.text, margin: 0 },
  postActions: { display: 'flex', gap: '0.5rem' },
  actionButton: { backgroundColor: 'transparent', border: 'none', borderRadius: '8px', padding: '0.5rem', cursor: 'pointer', transition: 'all 0.2s ease', fontSize: '1.1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  editButton: { color: colors.primary, '&:hover': { backgroundColor: '#EEF2FF' } },
  deleteButton: { color: colors.error, '&:hover': { backgroundColor: '#FEE2E2' } },
  // --- MODIFICATION 1 ---
  postContent: { color: colors.textLight, marginBottom: '1.25rem', lineHeight: 1.6 },
  postMeta: {
    display: 'flex',
    flexDirection: 'column', // Stack items vertically
    gap: '0.5rem',           // Adjust gap for vertical stacking
    fontSize: '0.8rem',
    color: colors.textLight,
    borderTop: `1px solid ${colors.border}`,
    paddingTop: '1rem',
  },
  // --- END MODIFICATION ---
  metaItem: { display: 'flex', alignItems: 'center', gap: '0.5rem' }, // Increased gap slightly for better icon spacing

  // Empty State & Messages
  emptyState: { backgroundColor: colors.card, borderRadius: '16px', padding: '3rem', textAlign: 'center', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)' },
  emptyIcon: { fontSize: '3rem', color: colors.primary, marginBottom: '1rem' },
  emptyText: { color: colors.textLight, marginBottom: '1.5rem' },
  message: { padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem', transition: 'opacity 0.3s, transform 0.3s', opacity: 0, transform: 'translateY(-10px)' },
  messageVisible: { opacity: 1, transform: 'translateY(0)' },
  successMessage: { backgroundColor: '#ECFDF5', color: colors.success },
  errorMessage: { backgroundColor: '#FEF2F2', color: colors.error },
  messageIcon: { fontSize: '1.25rem' },

  // Skeleton Loader
  skeleton: { backgroundColor: '#E5E7EB', borderRadius: '8px', animation: 'pulse 1.5s infinite ease-in-out' },
};

styles.skeletonCard = {
  ...styles.postItem,
  boxShadow: 'none',
};

// --- Helper Components ---
function SkeletonLoader() {
  return (
    <div style={styles.postList}>
      {[...Array(3)].map((_, i) => (
        <div key={i} style={styles.skeletonCard}>
          <div style={{ width: '100%' }}>
            <div style={{...styles.skeleton, width: '60%', height: '24px', marginBottom: '1rem'}}></div>
            <div style={{...styles.skeleton, width: '100%', height: '16px', marginBottom: '0.5rem'}}></div>
            <div style={{...styles.skeleton, width: '80%', height: '16px'}}></div>
          </div>
        </div>
      ))}
    </div>
  );
}

function PostList({ posts, onEdit, onDelete, onEmptyClick }) {
  const formatDate = (dateString) => {
    if (!dateString) return null;
    return new Date(dateString).toLocaleString(undefined, { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' });
  };

  if (posts.length === 0) {
    return (
      <div style={styles.emptyState}>
        <div style={styles.emptyIcon}><FaPenFancy /></div>
        <h3 style={{ color: colors.text, marginBottom: '0.5rem' }}>No Posts Found</h3>
        <p style={styles.emptyText}>Create a new post or adjust your search term.</p>
        <button onClick={onEmptyClick} style={{ ...styles.button, ...styles.primaryButton }}>
          <FiPlus /> Create New Post
        </button>
      </div>
    );
  }
  
  return (
    <div style={styles.postList}>
      {posts.map((post) => {
        const createdDate = new Date(post.created_at);
        const updatedDate = new Date(post.updated_at);
        const showUpdated = updatedDate && (updatedDate.getTime() - createdDate.getTime() > 60000);

        return (
          <div key={post.id} style={styles.postItem}>
            <div style={styles.postHeader}>
              <h3 style={styles.postTitle}>{post.title}</h3>
              <div style={styles.postActions}>
                <button onClick={() => onEdit(post)} style={{ ...styles.actionButton, ...styles.editButton }} title="Edit Post"><FiEdit2 /></button>
                <button onClick={() => onDelete(post.id)} style={{ ...styles.actionButton, ...styles.deleteButton }} title="Delete Post"><FiTrash2 /></button>
              </div>
            </div>
            <p style={styles.postContent}>{post.content.length > 150 ? `${post.content.substring(0, 150)}...` : post.content}</p>
            {/* --- MODIFICATION 2: Changed structure for vertical layout --- */}
            <div style={styles.postMeta}>
              <div style={styles.metaItem}><FiClock size={14} /> Created: {formatDate(post.created_at)}</div>
              {showUpdated && (<div style={styles.metaItem}><FiRefreshCw size={14} /> Updated: {formatDate(post.updated_at)}</div>)}
            </div>
            {/* --- END MODIFICATION --- */}
          </div>
        );
      })}
    </div>
  );
}

// --- Main Dashboard Component ---
export default function Dashboard() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editingPost, setEditingPost] = useState(null);
  const [message, setMessage] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const titleInputRef = useRef(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await api.get("/posts/me");
        const sortedPosts = res.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        setPosts(sortedPosts);
      } catch (err) {
        showMessage("Failed to load your posts.", false);
      } finally {
        setLoading(false);
      }
    };
    // Simulate loading for better UX
    setTimeout(fetchPosts, 750);
  }, []);

  const showMessage = (msg, success) => {
    setMessage(msg);
    setIsSuccess(success);
    setTimeout(() => setMessage(null), 5000);
  };

  const clearForm = () => {
    setTitle("");
    setContent("");
    setEditingPost(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const postData = { title, content };
    try {
      if (editingPost) {
        await api.put(`/posts/${editingPost.id}`, postData);
        showMessage("Post updated successfully!", true);
      } else {
        await api.post("/posts", postData);
        showMessage("Post created successfully!", true);
      }
      clearForm();
      const res = await api.get("/posts/me");
      setPosts(res.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)));
    } catch (err) {
      showMessage("An error occurred while saving the post.", false);
    }
  };

  const handleEdit = (post) => {
    setEditingPost(post);
    setTitle(post.title);
    setContent(post.content);
    titleInputRef.current?.focus();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        await api.delete(`/posts/${id}`);
        showMessage("Post deleted successfully.", true);
        setPosts(posts.filter(p => p.id !== id));
      } catch (err) {
        showMessage("Error deleting post.", false);
      }
    }
  };

  const handleEmptyStateClick = () => {
    titleInputRef.current?.focus();
  };

  const { filteredPosts, totalWords, avgWords } = useMemo(() => {
    const lowercasedFilter = searchTerm.toLowerCase();
    const filtered = posts.filter(post =>
      post.title.toLowerCase().includes(lowercasedFilter) ||
      post.content.toLowerCase().includes(lowercasedFilter)
    );
    const words = posts.reduce((acc, post) => acc + (post.content?.split(' ').length || 0), 0);
    const avg = posts.length > 0 ? Math.round(words / posts.length) : 0;
    return { filteredPosts: filtered, totalWords: words, avgWords: avg };
  }, [searchTerm, posts]);

  return (
    <div style={styles.pageContainer}>
      <div style={styles.dashboardLayout}>
        {/* Left Panel */}
        <aside style={styles.leftPanel}>
          <div style={styles.panelHeader}>
            <div style={styles.panelIcon}>{editingPost ? <FaPenFancy /> : <FiPlus />}</div>
            <h2 style={styles.panelTitle}>{editingPost ? "Edit Post" : "Create Post"}</h2>
          </div>
          {message && (
            <div style={{ ...styles.message, ...(isSuccess ? styles.successMessage : styles.errorMessage), ...(message && styles.messageVisible) }}>
              {isSuccess ? <FiCheck style={styles.messageIcon} /> : <FiX style={styles.messageIcon} />}
              {message}
            </div>
          )}
          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.inputGroup}>
              <label style={styles.label} htmlFor="title">Title</label>
              <input id="title" ref={titleInputRef} type="text" placeholder="Your amazing post title" style={styles.input} value={title} onChange={(e) => setTitle(e.target.value)} required />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label} htmlFor="content">Content</label>
              <textarea id="content" placeholder="Write your content here..." style={{ ...styles.input, ...styles.textarea }} value={content} onChange={(e) => setContent(e.target.value)} required />
            </div>
            <div style={styles.buttonGroup}>
              <button type="submit" style={{ ...styles.button, ...styles.primaryButton }}>{editingPost ? "Update Post" : "Publish Post"}</button>
              {editingPost && (<button type="button" onClick={clearForm} style={{ ...styles.button, ...styles.secondaryButton }}>Cancel</button>)}
            </div>
          </form>
        </aside>
        
        {/* Right Panel */}
        <main style={styles.rightPanel}>
          {/* Stats */}
          <section style={styles.statsContainer}>
            <div style={styles.statCard}>
              <div style={{...styles.statIcon, background: `linear-gradient(45deg, ${colors.accentBlue}, #60A5FA)`}}><FaChartBar /></div>
              <div style={styles.statContent}><h3 style={styles.statValue}>{posts.length}</h3><p style={styles.statLabel}>Total Posts</p></div>
            </div>
            <div style={styles.statCard}>
              <div style={{...styles.statIcon, background: `linear-gradient(45deg, ${colors.accentGreen}, #34D399)`}}><FaFileWord /></div>
              <div style={styles.statContent}><h3 style={styles.statValue}>{totalWords.toLocaleString()}</h3><p style={styles.statLabel}>Total Words</p></div>
            </div>
            <div style={styles.statCard}>
              <div style={{...styles.statIcon, background: `linear-gradient(45deg, ${colors.accentAmber}, #FBBF24)`}}><BsBodyText /></div>
              <div style={styles.statContent}><h3 style={styles.statValue}>{avgWords}</h3><p style={styles.statLabel}>Words/Post</p></div>
            </div>
          </section>
          
          {/* Posts */}
          <section>
            <div style={styles.rightPanelHeader}>
              <h2 style={{...styles.panelTitle, margin: 0, border: 'none'}}>My Articles</h2>
              <div style={styles.searchContainer}>
                <i style={styles.searchIcon}><FiSearch /></i>
                <input type="text" placeholder="Search posts..." style={styles.searchInput} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
              </div>
            </div>
            {loading ? <SkeletonLoader /> : <PostList posts={filteredPosts} onEdit={handleEdit} onDelete={handleDelete} onEmptyClick={handleEmptyStateClick} />}
          </section>
        </main>
      </div>
    </div>
  );
}