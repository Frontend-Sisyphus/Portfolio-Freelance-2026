"use client";
import React, { useEffect, useRef } from "react";

import { useTranslations } from "next-intl";

import { useInView } from "framer-motion";

import { useView } from "@/context/ViewProvider";

import { projects } from "@/data/projects";

import Project from "@/entities/Project";

import AnimatedTitle from "@/shared/AnimatedTitle";

import "@/styles/widgets/projects.css";

const Projects = () => {
  const t = useTranslations('projects');

  const { setSectionInView } = useView();

  const projectsRef = useRef(null);

  const isInView = useInView(projectsRef);

  useEffect(() => {
    if (isInView) {
      setSectionInView("проекты");
    }
  }, [isInView]);
  return (
    <section id="projects" ref={projectsRef} className="projects">
      <AnimatedTitle
        type={2}
        text={t('title')}
        className="sectionTitle"
        wordSpace="mr-[14px]"
        charSpace="mr-[0.5px]"
      />

      <div className="projects-container">
        {projects.map((project) => (
          <Project
            key={project.id}
            owner={project.owner}
            banner={project.banner}
            title={project.title}
            siteLink={project.siteLink}
            githubLink={project.githubLink}
            description={project.description}
            tags={project.tags}
          />
        ))}
      </div>
    </section>
  );
};

export default Projects;