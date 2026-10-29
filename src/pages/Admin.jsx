import React, { useEffect, useState } from "react";
import { gereftanProjeha, ezafeKardanProje, hazfProje } from "../api";
import Modal from "../components/Modal";

const USERNAME = "amirmehdi";
const PASSWORD = "1234";

function Admin() {
  const [varedShode, setVaredShode] = useState(sessionStorage.getItem("adminLogin") === "yes");
  const [namKarbar, setNamKarbar] = useState("");
  const [ramz, setRamz] = useState("");
  const [khatayeVorod, setKhatayeVorod] = useState("");
  const [projeha, setProjeha] = useState([]);
  const [namayesh, setNamayesh] = useState(false);
  const [darHal, setDarHal] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (varedShode) gereftanEtelaat();
  }, [varedShode]);

  async function gereftanEtelaat() {
    try {
      setError("");
      const data = await gereftanProjeha();
      setProjeha(data);
    } catch {
      setError("اطلاعات دریافت نشد. آدرس API را بررسی کن.");
    } finally {
      setDarHal(false);
    }
  }

  function vorod(e) {
    e.preventDefault();
    if (namKarbar === USERNAME && ramz === PASSWORD) {
      sessionStorage.setItem("adminLogin", "yes");
      setVaredShode(true);
      setKhatayeVorod("");
    } else {
      setKhatayeVorod("نام کاربری یا رمز عبور اشتباه است.");
    }
  }

  function khoroj() {
    sessionStorage.removeItem("adminLogin");
    setVaredShode(false);
    setNamKarbar("");
    setRamz("");
    setDarHal(true);
  }

  async function add(project) {
    const data = await ezafeKardanProje(project);
    setProjeha([...projeha, data]);
  }

  async function hazf(id) {
    if (!window.confirm("از حذف این پروژه مطمئنی؟")) return;
    try {
      await hazfProje(id);
      setProjeha(projeha.filter((item) => item.id !== id));
    } catch {
      setError("پروژه حذف نشد. دوباره امتحان کن.");
    }
  }

  if (!varedShode) {
    return (
      <div className="login-page">
        <form className="login-box" onSubmit={vorod}>
          <div className="login-mark">AM</div>
          <p className="section-kicker">بخش مدیریت</p>
          <h1>ورود مدیر</h1>
          <p className="login-description">برای ورود به پنل، اطلاعات حساب را وارد کن.</p>
          <label htmlFor="username">نام کاربری</label>
          <input id="username" value={namKarbar} onChange={(e) => setNamKarbar(e.target.value)} autoComplete="username" required />
          <label htmlFor="password">رمز عبور</label>
          <input id="password" type="password" value={ramz} onChange={(e) => setRamz(e.target.value)} autoComplete="current-password" required />
          {khatayeVorod && <p className="error">{khatayeVorod}</p>}
          <button className="submit-btn" type="submit">ورود به پنل</button>
        </form>
      </div>
    );
  }

  return (
    <div className="admin">
      <div className="sidebar">
        <h3>Admin Dashboard</h3>
        <p>نمای کلی</p>
        <p className="active">پروژه‌ها</p>
        <button className="logout-btn" onClick={khoroj}>خروج از حساب</button>
      </div>

      <div className="admin-main">
        <div className="admin-top">
          <div><p className="section-kicker">مدیریت کارها</p><h1>پروژه‌ها</h1></div>
          <button className="add-btn" onClick={() => setNamayesh(true)}>+</button>
        </div>

        {darHal && <p>در حال دریافت پروژه‌ها...</p>}
        {error && <p className="error">{error}</p>}
        {!darHal && projeha.length === 0 && !error && <p>پروژه‌ای وجود ندارد. برای ساخت روی + بزن.</p>}

        <div className="admin-list">
          {projeha.map((project) => (
            <div className="admin-item" key={project.id}>
              <div className="admin-info">
                <h3>{project.title || project.name || "بدون عنوان"}</h3>
                <p>{project.description || project.message || ""}</p>
              </div>
              <div className="admin-buttons">
                <div className="skills">
                  {(Array.isArray(project.skills) ? project.skills : (project.skills || "").split(",")).map((item, index) => (
                    String(item).trim() && <span className="skill" key={index}>{String(item).trim()}</span>
                  ))}
                </div>
                <button className="delete-btn" onClick={() => hazf(project.id)}>حذف</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {namayesh && <Modal bastan={() => setNamayesh(false)} zakhire={add} />}
    </div>
  );
}

export default Admin;
