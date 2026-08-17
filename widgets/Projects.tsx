"use client";
import React from "react";

import { useTranslations } from "next-intl";

import { projects } from "@/data/projects";

import Project from "@/entities/Project";

import AnimatedTitle from "@/shared/AnimatedTitle";
import SectionMeta from "@/shared/SectionMeta";

import "@/styles/widgets/projects.css";

const Projects = () => {
  const t = useTranslations('projects');

  return (
    <section id="projects" className="projects">
      <SectionMeta index="05" label={t("meta")} />

      <AnimatedTitle
        type={2}
        text={t('title')}
        className="sectionTitle"
        wordSpace="mr-[14px]"
        charSpace="mr-[0.5px]"
      />

      <div className="projects-container">
        {projects.map((project, index) => (
          <Project
            key={project.id}
            index={index}
            owner={project.owner}
            banner={project.banner}
            title={project.title}
            siteLink={project.siteLink}
            githubLink={project.githubLink}
            tags={project.tags}
          />
        ))}
      </div>
    </section>
  );
};

export default Projects;