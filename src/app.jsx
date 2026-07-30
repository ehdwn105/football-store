import React, { useState } from 'react';

export default function FootballStore() {
  const [cart, setCart] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [formData, setFormData] = useState({ email: '', password: '', name: '' });
  const [users, setUsers] = useState([]);

  const products = [
    { id: 1, name: 'Premium Football', price: 79.99, category: 'balls', image: '⚽' },
    { id: 2, name: 'Professional Cleats', price: 129.99, category: 'shoes', image: '👟' },
    { id: 3, name: 'Team Jersey', price: 49.99, category: 'apparel', image: '👕' },
    { id: 4, name: 'Goalkeeper Gloves', price: 89.99, category: 'accessories', image: '🧤' },
    { id: 5, name: 'Soccer Shin Guards', price: 34.99, category: 'accessories', image: '🛡️' },
    { id: 6, name: 'Training Shorts', price: 44.99, category: 'apparel', image: '👖' },
    { id: 7, name: 'Football Socks', price: 14.99, category: 'apparel', image: '🧦' },
    { id: 8, name: 'Training Cones Set', price: 24.99, category: 'equipment', image: '🎯' },
  ];

  const categories = [
    { id: 'all', label: 'All products' },
    { id: 'balls', label: 'Balls' },
    { id: 'shoes', label: 'Shoes' },
    { id: 'apparel', label: 'Apparel' },
    { id: 'accessories', label: 'Accessories' },
    { id: 'equipment', label: 'Equipment' },
  ];

  const handleLogin = () => {
    const user = users.find(u => u.email === formData.email && u.password === formData.password);
    if (user) {
      setIsLoggedIn(true);
      setCurrentUser(user);
      setShowLoginModal(false);
      setFormData({ email: '', password: '', name: '' });
    } else {
      alert('이메일 또는 비밀번호가 틀렸습니다.');
    }
  };

  const handleSignup = () => {
    if (!formData.name || !formData.email || !formData.password) {
      alert('모든 필드를 입력해주세요.');
      return;
    }
    if (users.find(u => u.email === formData.email)) {
      alert('이미 존재하는 이메일입니다.');
      return;
    }
    const newUser = { name: formData.name, email: formData.email, password: formData.password };
    setUsers([...users, newUser]);
    setIsLoggedIn(true);
    setCurrentUser(newUser);
    setShowSignupModal(false);
    setFormData({ email: '', password: '', name: '' });
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    setCart([]);
  };

  const filtered = selectedCategory === 'all' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  const addToCart = (product) => {
    if (!isLoggedIn) {
      alert('로그인 후 구매할 수 있습니다.');
      setShowLoginModal(true);
      return;
    }
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      setCart(cart.map(item =>
        item.id === productId
          ? { ...item, quantity }
          : item
      ));
    }
  };

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div style={{ background: '#f5f5f5', minHeight: '100vh', padding: 0 }}>
      <div style={{ 
        background: '#ffffff', 
        borderBottom: '1px solid #e0e0e0',
        padding: '1rem 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <h1 style={{ fontSize: '24px', fontWeight: '500', margin: 0, color: '#000' }}>
          ⚽ Football Store
        </h1>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          {isLoggedIn ? (
            <>
              <span style={{ fontSize: '14px', color: '#666' }}>
                {currentUser.name}님
              </span>
              <button
                onClick={handleLogout}
                style={{
                  padding: '8px 14px',
                  fontSize: '13px',
                  border: '1px solid #ddd',
                  background: '#fff',
                  color: '#000',
                  borderRadius: '6px',
                  cursor: 'pointer'
                }}
              >
                로그아웃
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setShowLoginModal(true)}
                style={{
                  padding: '8px 14px',
                  fontSize: '13px',
                  border: '1px solid #0066cc',
                  background: '#0066cc',
                  color: '#fff',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontWeight: '500'
                }}
              >
                로그인
              </button>
              <button
                onClick={() => setShowSignupModal(true)}
                style={{
                  padding: '8px 14px',
                  fontSize: '13px',
                  border: '1px solid #ddd',
                  background: '#fff',
                  color: '#000',
                  borderRadius: '6px',
                  cursor: 'pointer'
                }}
              >
                회원가입
              </button>
            </>
          )}
        </div>
      </div>

      <div style={{ padding: '2rem 1rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
            <div>
              <div style={{ marginBottom: '1.5rem' }}>
                <p style={{ fontSize: '14px', color: '#666', marginBottom: '12px' }}>카테고리로 필터링</p>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {categories.map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      style={{
                        padding: '8px 14px',
                        fontSize: '13px',
                        border: `1px solid ${selectedCategory === cat.id ? '#0066cc' : '#ddd'}`,
                        background: selectedCategory === cat.id ? '#e6f2ff' : '#fff',
                        color: selectedCategory === cat.id ? '#0066cc' : '#000',
                        borderRadius: '6px',
                        cursor: 'pointer'
                      }}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
                {filtered.map(product => (
                  <div
                    key={product.id}
                    style={{
                      background: '#fff',
                      border: '1px solid #e0e0e0',
                      borderRadius: '12px',
                      padding: '12px',
                      display: 'flex',
                      flexDirection: 'column'
                    }}
                  >
                    <div style={{ fontSize: '32px', marginBottom: '8px' }}>
                      {product.image}
                    </div>
                    <h3 style={{ fontSize: '14px', fontWeight: '500', margin: '0 0 4px', color: '#000' }}>
                      {product.name}
                    </h3>
                    <p style={{ fontSize: '13px', color: '#666', margin: '0 0 8px' }}>
                      ${product.price.toFixed(2)}
                    </p>
                    <button
                      onClick={() => addToCart(product)}
                      style={{
                        padding: '8px 12px',
                        fontSize: '12px',
                        border: '1px solid #0066cc',
                        background: '#0066cc',
                        color: '#fff',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontWeight: '500'
                      }}
                    >
                      장바구니 추가
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div style={{
                background: '#fff',
                border: '1px solid #e0e0e0',
                borderRadius: '12px',
                padding: '1.25rem',
                position: 'sticky',
                top: '20px'
              }}>
                <h2 style={{ fontSize: '18px', fontWeight: '500', margin: '0 0 1rem', color: '#000' }}>
                  장바구니
                </h2>

                {!isLoggedIn ? (
                  <p style={{ color: '#666', fontSize: '14px', textAlign: 'center', padding: '2rem 0' }}>
                    로그인 후 구매할 수 있습니다.
                  </p>
                ) : cart.length === 0 ? (
                  <p style={{ color: '#666', fontSize: '14px', textAlign: 'center', padding: '2rem 0' }}>
                    장바구니가 비어있습니다.
                  </p>
                ) : (
                  <>
                    <div style={{ marginBottom: '1rem', maxHeight: '400px', overflowY: 'auto' }}>
                      {cart.map(item => (
                        <div
                          key={item.id}
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            paddingBottom: '12px',
                            marginBottom: '12px',
                            borderBottom: '1px solid #e0e0e0'
                          }}
                        >
                          <div style={{ flex: 1 }}>
                            <p style={{ fontSize: '14px', fontWeight: '500', margin: '0 0 4px', color: '#000' }}>
                              {item.name}
                            </p>
                            <p style={{ fontSize: '13px', color: '#666', margin: 0 }}>
                              ${(item.price * item.quantity).toFixed(2)}
                            </p>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              style={{
                                width: '28px',
                                height: '28px',
                                border: '1px solid #ddd',
                                background: '#fff',
                                borderRadius: '6px',
                                cursor: 'pointer',
                                fontSize: '12px'
                              }}
                            >
                              −
                            </button>
                            <span style={{ width: '24px', textAlign: 'center', fontSize: '13px' }}>
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              style={{
                                width: '28px',
                                height: '28px',
                                border: '1px solid #ddd',
                                background: '#fff',
                                borderRadius: '6px',
                                cursor: 'pointer',
                                fontSize: '12px'
                              }}
                            >
                              +
                            </button>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              style={{
                                width: '28px',
                                height: '28px',
                                border: '1px solid #ff4444',
                                background: '#fff',
                                color: '#ff4444',
                                borderRadius: '6px',
                                cursor: 'pointer',
                                fontSize: '12px'
                              }}
                            >
                              ×
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div style={{ borderTop: '1px solid #e0e0e0', paddingTop: '1rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                        <span style={{ color: '#666', fontSize: '13px' }}>상품 수</span>
                        <span style={{ fontSize: '13px' }}>{itemCount}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                        <span style={{ color: '#666', fontSize: '13px' }}>합계</span>
                        <span style={{ fontSize: '13px', fontWeight: '500' }}>${total.toFixed(2)}</span>
                      </div>
                      <button
                        style={{
                          width: '100%',
                          padding: '12px',
                          fontSize: '14px',
                          fontWeight: '500',
                          border: '1px solid #0066cc',
                          background: '#0066cc',
                          color: '#fff',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          marginTop: '12px'
                        }}
                      >
                        결제하기
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {showLoginModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: '#fff',
            borderRadius: '12px',
            padding: '2rem',
            width: '90%',
            maxWidth: '400px',
            border: '1px solid #e0e0e0'
          }}>
            <h2 style={{ fontSize: '20px', fontWeight: '500', margin: '0 0 1.5rem', color: '#000' }}>
              로그인
            </h2>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '14px', marginBottom: '6px', color: '#666' }}>이메일</label>
              <input
                type="email"
                placeholder="example@email.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  fontSize: '14px',
                  border: '1px solid #ddd',
                  borderRadius: '6px',
                  boxSizing: 'border-box',
                  background: '#fafafa'
                }}
              />
            </div>
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', fontSize: '14px', marginBottom: '6px', color: '#666' }}>비밀번호</label>
              <input
                type="password"
                placeholder="비밀번호 입력"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  fontSize: '14px',
                  border: '1px solid #ddd',
                  borderRadius: '6px',
                  boxSizing: 'border-box',
                  background: '#fafafa'
                }}
              />
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={handleLogin}
                style={{
                  flex: 1,
                  padding: '10px',
                  fontSize: '14px',
                  fontWeight: '500',
                  border: '1px solid #0066cc',
                  background: '#0066cc',
                  color: '#fff',
                  borderRadius: '6px',
                  cursor: 'pointer'
                }}
              >
                로그인
              </button>
              <button
                onClick={() => {
                  setShowLoginModal(false);
                  setFormData({ email: '', password: '', name: '' });
                }}
                style={{
                  flex: 1,
                  padding: '10px',
                  fontSize: '14px',
                  border: '1px solid #ddd',
                  background: '#fff',
                  color: '#000',
                  borderRadius: '6px',
                  cursor: 'pointer'
                }}
              >
                취소
              </button>
            </div>
          </div>
        </div>
      )}

      {showSignupModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: '#fff',
            borderRadius: '12px',
            padding: '2rem',
            width: '90%',
            maxWidth: '400px',
            border: '1px solid #e0e0e0'
          }}>
            <h2 style={{ fontSize: '20px', fontWeight: '500', margin: '0 0 1.5rem', color: '#000' }}>
              회원가입
            </h2>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '14px', marginBottom: '6px', color: '#666' }}>이름</label>
              <input
                type="text"
                placeholder="이름 입력"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  fontSize: '14px',
                  border: '1px solid #ddd',
                  borderRadius: '6px',
                  boxSizing: 'border-box',
                  background: '#fafafa'
                }}
              />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '14px', marginBottom: '6px', color: '#666' }}>이메일</label>
              <input
                type="email"
                placeholder="example@email.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  fontSize: '14px',
                  border: '1px solid #ddd',
                  borderRadius: '6px',
                  boxSizing: 'border-box',
                  background: '#fafafa'
                }}
              />
            </div>
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', fontSize: '14px', marginBottom: '6px', color: '#666' }}>비밀번호</label>
              <input
                type="password"
                placeholder="비밀번호 입력"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  fontSize: '14px',
                  border: '1px solid #ddd',
                  borderRadius: '6px',
                  boxSizing: 'border-box',
                  background: '#fafafa'
                }}
              />
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={handleSignup}
                style={{
                  flex: 1,
                  padding: '10px',
                  fontSize: '14px',
                  fontWeight: '500',
                  border: '1px solid #0066cc',
                  background: '#0066cc',
                  color: '#fff',
                  borderRadius: '6px',
                  cursor: 'pointer'
                }}
              >
                회원가입
              </button>
              <button
                onClick={() => {
                  setShowSignupModal(false);
                  setFormData({ email: '', password: '', name: '' });
                }}
                style={{
                  flex: 1,
                  padding: '10px',
                  fontSize: '14px',
                  border: '1px solid #ddd',
                  background: '#fff',
                  color: '#000',
                  borderRadius: '6px',
                  cursor: 'pointer'
                }}
              >
                취소
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
    }
