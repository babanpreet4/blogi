import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

// --- Placeholder images for the blog cards ---
const placeholderImages = [
  "https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
  "https://images.unsplash.com/photo-1522199755839-a2bacb67c546?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
  "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
];

// Contributors data
const mockAuthors = [
  { id: 1, name: "Jane Doe", avatar: "https://randomuser.me/api/portraits/women/44.jpg", bio: "Tech enthusiast and lead writer.", posts: 42 },
  { id: 2, name: "John Smith", avatar: "https://randomuser.me/api/portraits/men/32.jpg", bio: "Specialist in frontend frameworks.", posts: 28 },
  { id: 3, name: "Alex Ray", avatar: "https://randomuser.me/api/portraits/men/75.jpg", bio: "Creative writer and lifestyle blogger.", posts: 35 },
];

// Modern, professional styles (This object remains the same)
const styles = {
  // Base styles
  pageContainer: { 
    backgroundColor: "#f8fafc", 
    color: "#334155", 
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    lineHeight: 1.6
  },
  container: { 
    maxWidth: "1280px", 
    margin: "0 auto", 
    padding: "0 32px",
    "@media (max-width: 768px)": {
      padding: "0 16px"
    }
  },
  
  // Typography
  heading1: { 
    fontSize: 'clamp(2.5rem, 5vw, 4rem)', 
    fontWeight: 800, 
    lineHeight: 1.2,
    background: "linear-gradient(90deg, #3b82f6, #10b981)",
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    color: "transparent",
    marginBottom: '1.5rem'
  },
  heading2: { 
    fontSize: 'clamp(2rem, 4vw, 3rem)', 
    fontWeight: 700, 
    color: '#1e293b',
    marginBottom: '1rem',
    position: 'relative',
    display: 'inline-block',
  },
  heading3: { 
    fontSize: '1.5rem', 
    fontWeight: 600, 
    color: '#1e293b',
    marginBottom: '0.75rem'
  },
  paragraph: {
    fontSize: '1.1rem',
    color: '#475569',
    marginBottom: '1.5rem'
  },
  
  // Hero section
  heroSection: { 
    position: 'relative',
    padding: '8rem 0 6rem',
    overflow: 'hidden',
  },
  heroContent: {
    position: 'relative',
    zIndex: 1,
    maxWidth: '600px'
  },
  heroImageContainer: {
    position: 'absolute',
    right: '0',
    top: '50%',
    transform: 'translateY(-50%)',
    width: '50%',
    height: '100%',
  },
  heroImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: '16px',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
  },
  
  // Buttons
  buttonPrimary: { 
    padding: '14px 28px', 
    background: 'linear-gradient(90deg, #3b82f6, #10b981)',
    color: 'white', 
    border: 'none', 
    borderRadius: '8px', 
    fontSize: '1rem', 
    fontWeight: 600, 
    cursor: 'pointer', 
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  buttonSecondary: { 
    padding: '14px 28px', 
    background: 'white', 
    color: '#3b82f6', 
    border: '2px solid #3b82f6', 
    borderRadius: '8px', 
    fontSize: '1rem', 
    fontWeight: 600, 
    cursor: 'pointer', 
    transition: 'all 0.3s ease',
  },
  
  // Sections
  section: { 
    padding: '6rem 0',
    position: 'relative'
  },
  sectionDark: {
    backgroundColor: '#1e293b',
    color: '#f8fafc'
  },
  sectionHeader: {
    textAlign: 'center',
    marginBottom: '4rem'
  },
  
  // Grid
  gridContainer: { 
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '32px',
  },
  
  // Cards
  card: {
    background: 'white',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
    transition: 'all 0.3s ease',
    display: 'flex',
    flexDirection: 'column',
  },
  cardImage: {
    width: '100%',
    height: '200px',
    objectFit: 'cover'
  },
  cardBody: {
    padding: '24px',
    flexGrow: 1, // Make body grow to push footer down
  },
  cardFooter: {
    padding: '0 24px 24px'
  },
  
  // Author card
  authorCard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    padding: '2rem',
    background: 'white',
    borderRadius: '12px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
  },
  authorAvatar: {
    width: '120px',
    height: '120px',
    borderRadius: '50%',
    objectFit: 'cover',
    marginBottom: '1.5rem',
    border: '4px solid #e2e8f0',
    transition: 'all 0.3s ease',
  },
  authorStats: {
    display: 'flex',
    gap: '1rem',
    marginTop: '1rem',
  },
  
  // Modal
  modalBackdrop: { 
    position: 'fixed', 
    top: 0, 
    left: 0, 
    width: '100%', 
    height: '100%', 
    backgroundColor: 'rgba(0, 0, 0, 0.7)', 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    zIndex: 2000,
    backdropFilter: 'blur(5px)'
  },
  modalContent: { 
    backgroundColor: 'white', 
    padding: '3rem', 
    borderRadius: '16px', 
    maxWidth: '800px', 
    width: '90%', 
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)', 
    position: 'relative', 
    maxHeight: '90vh', 
    overflowY: 'auto' 
  },
  modalCloseButton: { 
    position: 'absolute', 
    top: '1.5rem', 
    right: '1.5rem', 
    background: 'transparent', 
    border: 'none', 
    fontSize: '1.5rem', 
    color: '#94a3b8', 
    cursor: 'pointer', 
    transition: 'color 0.2s',
  }
};


export default function Home() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [showAllPosts, setShowAllPosts] = useState(false);
  
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await api.get("/posts");
        setPosts(res.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)));
      } catch (err) { 
        setError("Failed to load posts."); 
      } finally { 
        setLoading(false); 
      }
    };
    fetchPosts();
  }, []);
  
  const formatDate = (dateString) => new Date(dateString).toLocaleString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  const handleReadMore = (post) => {
    if (!token) {
      if (window.confirm("Please log in to read the full post. Go to login page?")) navigate('/login');
      return;
    }
    setSelectedPost(post); 
    setIsModalOpen(true);
  };

  const handleCloseModal = () => { 
    setIsModalOpen(false); 
    setSelectedPost(null); 
  };

  const displayedPosts = showAllPosts ? posts : posts.slice(0, 3);

  if (loading) return (
    <div style={{...styles.pageContainer, textAlign: 'center', padding: '5rem'}}>
      <div style={{fontSize: '1.5rem', color: '#64748b'}}>Loading content...</div>
    </div>
  );
  
  if (error) return (
    <div style={{...styles.pageContainer, textAlign: 'center', padding: '5rem'}}>
      <div style={{fontSize: '1.5rem', color: '#ef4444'}}>{error}</div>
      <button 
        onClick={() => window.location.reload()} 
        style={{...styles.buttonPrimary, marginTop: '1rem'}}
      >
        Try Again
      </button>
    </div>
  );

  return (
    <div style={styles.pageContainer}>
      {/* Hero Section */}
      <section style={styles.heroSection}>
        <div style={styles.container}>
          <div style={{display: 'flex', alignItems: 'center', position: 'relative'}}>
            <div style={styles.heroContent}>
              <h1 style={styles.heading1}>Share Your Ideas With The World</h1>
              <p style={{...styles.paragraph, fontSize: '1.25rem'}}>
                A modern platform for writers and thinkers to publish, connect, and grow their audience.
              </p>
              <div style={{display: 'flex', gap: '1rem', marginTop: '2rem'}}>
                <button 
                  style={styles.buttonPrimary} 
                  onClick={() => navigate('/dashboard')}
                >
                  Start Writing
                </button>
                <button 
                  style={styles.buttonSecondary}
                  onClick={() => document.getElementById('featured-posts')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Explore Articles
                </button>
              </div>
            </div>
            <div style={styles.heroImageContainer}>
              <img 
                src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
                alt="Writing on laptop" 
                style={styles.heroImage} 
              />
            </div>
          </div>
        </div>
      </section>

      {/* Articles Section */}
      <section id="featured-posts" style={styles.section}>
        <div style={styles.container}>
          <div style={styles.sectionHeader}>
            <h2 style={styles.heading2}>
              {showAllPosts ? 'All Articles' : 'Latest Articles'}
            </h2>
            <p style={styles.paragraph}>
              Discover insights and stories from our community of writers
            </p>
          </div>
          
          <div style={styles.gridContainer}>
            {displayedPosts.map((post, index) => {
              // --- LOGIC TO CHECK FOR UPDATE ---
              const createdDate = new Date(post.created_at);
              const updatedDate = post.updated_at ? new Date(post.updated_at) : null;
              const showUpdated = updatedDate && (updatedDate.getTime() - createdDate.getTime() > 60000); // Check if updated more than a minute after creation

              return (
                <div key={post.id} style={styles.card}>
                  <img 
                    src={post.image || placeholderImages[index % placeholderImages.length]} 
                    alt={post.title} 
                    style={styles.cardImage} 
                  />
                  <div style={styles.cardBody}>
                    <h3 style={styles.heading3}>{post.title}</h3>
                    <p style={{...styles.paragraph, fontSize: '0.9rem', marginBottom: '1rem'}}>
                      {post.content.substring(0, 120)}...
                    </p>
                    {/* --- UPDATED METADATA DISPLAY --- */}
                    <div style={{color: '#64748b', fontSize: '0.9rem'}}>
                      <p style={{ margin: 0 }}>By {post.author} • {formatDate(post.created_at)}</p>
                      {showUpdated && (
                        <p style={{ margin: '4px 0 0 0', fontStyle: 'italic', color: '#3b82f6' }}>
                          Updated: {formatDate(post.updated_at)}
                        </p>
                      )}
                    </div>
                  </div>
                  <div style={{...styles.cardFooter, marginTop: 'auto', paddingTop: '1rem'}}>
                    <button 
                      onClick={() => handleReadMore(post)} 
                      style={{
                        ...styles.buttonSecondary,
                        border: 'none',
                        padding: '0',
                        color: '#3b82f6',
                        fontWeight: 600
                      }}
                    >
                      Continue Reading →
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          
          {!showAllPosts && posts.length > 3 && (
            <div style={{ textAlign: 'center', marginTop: '4rem' }}>
              <button
                style={styles.buttonPrimary}
                onClick={() => setShowAllPosts(true)}
              >
                Explore All Articles
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Contributors Section */}
      <section style={{...styles.section, ...styles.sectionDark}}>
        <div style={styles.container}>
          <div style={styles.sectionHeader}>
            <h2 style={{...styles.heading2, color: 'white'}}>
              Our Top Contributors
            </h2>
            <p style={{...styles.paragraph, color: '#cbd5e1'}}>
              Meet the talented writers who make our community special
            </p>
          </div>
          
          <div style={styles.gridContainer}>
            {mockAuthors.map(author => (
              <div key={author.id} style={styles.authorCard}>
                <img 
                  src={author.avatar} 
                  alt={author.name} 
                  style={styles.authorAvatar} 
                />
                <h3 style={{...styles.heading3, marginBottom: '0.5rem'}}>{author.name}</h3>
                <p style={{...styles.paragraph, fontSize: '1rem'}}>{author.bio}</p>
                <div style={styles.authorStats}>
                  <div style={{padding: '0.5rem 1rem', background: '#334155', borderRadius: '8px', fontSize: '0.9rem'}}>{author.posts} Articles</div>
                  <div style={{padding: '0.5rem 1rem', background: '#334155', borderRadius: '8px', fontSize: '0.9rem'}}>12k Followers</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section style={styles.section}>
        <div style={{...styles.container, textAlign: 'center'}}>
          <h2 style={styles.heading2}>Ready to Start Your Writing Journey?</h2>
          <p style={{...styles.paragraph, maxWidth: '600px', margin: '0 auto 2rem'}}>
            Join thousands of writers who are already sharing their stories and building their audience.
          </p>
          <button 
            style={{...styles.buttonPrimary, padding: '16px 40px', fontSize: '1.1rem'}}
            onClick={() => navigate('/register')}
          >
            Create Your Account
          </button>
        </div>
      </section>

      {/* Modal */}
      {isModalOpen && selectedPost && (
        <div style={styles.modalBackdrop} onClick={handleCloseModal}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button onClick={handleCloseModal} style={styles.modalCloseButton}>×</button>
            <h2 style={styles.heading2}>{selectedPost.title}</h2>
            {/* --- UPDATED MODAL METADATA --- */}
            <div style={{...styles.paragraph, color: '#64748b', borderBottom: '1px solid #e2e8f0', paddingBottom: '1.5rem', marginBottom: '1.5rem'}}>
              <p style={{ margin: 0 }}>By <strong>{selectedPost.author}</strong></p>
              <p style={{ margin: '8px 0 0 0' }}>Created: {formatDate(selectedPost.created_at)}</p>
              {selectedPost.updated_at && (new Date(selectedPost.updated_at).getTime() - new Date(selectedPost.created_at).getTime() > 60000) && (
                <p style={{ margin: '4px 0 0 0', fontStyle: 'italic', color: '#3b82f6' }}>
                  Updated: {formatDate(selectedPost.updated_at)}
                </p>
              )}
            </div>
            <div style={{...styles.paragraph, whiteSpace: 'pre-wrap'}}>
              {selectedPost.content}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}