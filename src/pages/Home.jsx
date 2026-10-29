import React, { useEffect, useState } from "react";
import { gereftanProjeha } from "../api";
import Card from "../components/Card";

function Home() {
  const [projeha, setProjeha] = useState([]);
  const [darHal, setDarHal] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    gereftanProjeha()
      .then((data) => setProjeha(Array.isArray(data) ? data : []))
      .catch(() => setError("پروژه‌ها دریافت نشدن. اتصال API رو بررسی کن."))
      .finally(() => setDarHal(false));
  }, []);

  return (
    <div className="home">
      <div className="hero" id="about">
        <div className="hero-glow" />
        <span className="eyebrow"><span className="status-dot" /> Ready?</span>
        <h1> Hi <span>AmirMahdi</span> <br /></h1>
        <p className="hero-description">
          توسعه‌دهنده وب؛ علاقه‌مند به ساخت سایت‌های ساده، کاربردی و زیبا
        </p>
        <div className="social-links">
          <a className="primary-link" href="https://github.com/" target="_blank" rel="noreferrer">گیت‌هاب من</a>
          <a className="secondary-link" href="https://www.instagram.com/" target="_blank" rel="noreferrer">اینستاگرام</a>
        </div>
      </div>

      <div className="featured" id="projects">
        <div className="section-heading">
          <div>
            <span className="section-kicker">نمونه کارها</span>
            <h2>پروژه‌های <span>من</span></h2>
          </div>
          <p>چندتا از کارهایی که انجام دادم.</p>
        </div>

        {darHal && <div className="state-message"><span className="loader" /> در حال گرفتن پروژه‌ها...</div>}
        {error && <p className="error state-message">{error}</p>}
        {!darHal && !error && projeha.length === 0 && (
          <div className="empty-state"><span className="empty-icon">✳</span><h3>هنوز پروژه‌ای نیست</h3><p>از پنل مدیریت اولین پروژه رو اضافه کن</p></div>
        )}

        <div className="project-grid">
          {projeha.map((project) => <Card key={project.id} project={project} />)}
        </div>
      </div>

      <div className="contact-strip">
        <div><span className="section-kicker">ایده‌ای داری؟</span><h2>بیا یه چیز <span>خوب</span> بسازیم.</h2></div>
        <a href="https://github.com/" target="_blank" rel="noreferrer">ارتباط با من</a>
      </div>
    </div>
  );
}

export default Home;
