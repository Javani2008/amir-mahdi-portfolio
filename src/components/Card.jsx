import React from "react";

function Card({ project }) {
  const skills = Array.isArray(project.skills)
    ? project.skills
    : (project.skills || "").split(",");

  return (
    <div className="project-card">
      <div className="card-topline">
        <span className="project-icon">✳</span>
        <span className="project-number">پروژه {String(project.id || "01").padStart(2, "0")}</span>
      </div>
      <h2>{project.title || project.name || "بدون عنوان"}</h2>
      <p>{project.description || project.message || "یه پروژه با امکانات کاربردی."}</p>
      <div className="skills">
        {skills.map((item, index) => {
          const skill = String(item).trim();
          return skill ? <span className="skill" key={index}>{skill}</span> : null;
        })}
      </div>
      <div className="card-bottom"><span>جزئیات پروژه</span><span className="card-dot">●</span></div>
    </div>
  );
}

export default Card;
