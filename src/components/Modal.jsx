import React from "react";
import { useState } from "react";

function Modal({ bastan, zakhire }) {
  const [title, setOnvan] = useState("");
  const [description, setTozihat] = useState("");
  const [skills, setMaharatHa] = useState("");
  const [error, setError] = useState("");
  const [darHal, setDarHal] = useState(false);

  async function ersal(e) {
    e.preventDefault();

    if (!title.trim() || !description.trim() || !skills.trim()) {
      setError("لطفاً همه قسمت‌ها رو پر کن");
      return;
    }

    setDarHal(true);
    setError("");

    try {
      await zakhire({
        title: title.trim(),
        description: description.trim(),
        skills: skills.trim(),
      });
      bastan();
    } catch (err) {
      setError(err.message || "پروژه ساخته نشد");
    } finally {
      setDarHal(false);
    }
  }

  return (
    <div className="modal-bg" onClick={bastan}>
      <form className="modal" onSubmit={ersal} onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" type="button" onClick={bastan}>×</button>
        <h2>ساخت پروژه</h2>

        <label>عنوان</label>
        <input
          value={title}
          onChange={(e) => setOnvan(e.target.value)}
          placeholder="مثلاً سایت فروشگاهی"
        />

        <label>توضیحات</label>
        <textarea
          value={description}
          onChange={(e) => setTozihat(e.target.value)}
          placeholder=" توضیح کوتاه "
        />

        <label>مهارت‌ها</label>
        <input
          value={skills}
          onChange={(e) => setMaharatHa(e.target.value)}
          placeholder="مثلاً React, JavaScript, CSS"
        />

        {error && <p className="error">{error}</p>}

        <button className="submit-btn" type="submit" disabled={darHal}>
          {darHal ? "در حال ذخیره..." : "ساخت پروژه"}
        </button>
      </form>
    </div>
  );
}

export default Modal;
