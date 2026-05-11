"use client";
import React, { useRef } from "react";

import { useInView } from "framer-motion";

import Link from "next/link";

import "@/styles/entities/project.css";

interface ProjectProps {
  banner: string;
  owner: string;
  title: string;
  siteLink: string;
  githubLink: string;
  description: string;
  tags: string[];
}

const Project: React.FC<ProjectProps> = ({
  banner,
  owner,
  title,
  siteLink,
  githubLink,
  description,
  tags,
}) => {
  const projectRef = useRef(null);

  const isInView = useInView(projectRef, { once: true });
  return (
    <div
      ref={projectRef}
      className={`project ${isInView ? "translate-y-0 opacity-100" : "translate-y-[16px] opacity-0"}`}
    >
      <img src={banner} alt="" className="project-banner" />

      <div className="project-info">
        <div className="project-info-top">
          <h3 className="project-info-top-title">{title}</h3>

          <div className="project-info-top-links">
            {siteLink.includes("https") ? (
              <Link
                href={siteLink}
                aria-label="View site link"
                data-blobity-radius="32"
                data-blobity-magnetic="false"
                className="project-info-top-links-item"
              >
                <svg
                  viewBox="0 0 22 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16.5 11.917v5.5a1.833 1.833 0 0 1-1.833 1.833H4.583a1.833 1.833 0 0 1-1.833-1.833V7.333A1.833 1.833 0 0 1 4.583 5.5h5.5m3.667-2.75h5.5v5.5M9.167 12.833 19.25 2.75"
                    stroke="#fff"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            ) : (
              <div
                {...(!siteLink.includes("https") && {
                  "data-blobity-tooltip": siteLink,
                })}
                data-blobity-magnetic="false"
                className="project-info-top-links-item inactive-link"
              >
                <svg
                  viewBox="0 0 22 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16.5 11.917v5.5a1.833 1.833 0 0 1-1.833 1.833H4.583a1.833 1.833 0 0 1-1.833-1.833V7.333A1.833 1.833 0 0 1 4.583 5.5h5.5m3.667-2.75h5.5v5.5M9.167 12.833 19.25 2.75"
                    stroke="#fff"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            )}

            {githubLink ? (
              <Link
                href={githubLink}
                aria-label="View Github repo"
                data-blobity-radius="32"
                data-blobity-magnetic="false"
                className="project-info-top-links-item"
              >
                <svg
                  viewBox="0 0 22 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.25 17.417c-4.583 1.375-4.583-2.292-6.417-2.75m12.834 5.5v-3.548a3.1 3.1 0 0 0-.862-2.392c2.878-.321 5.903-1.412 5.903-6.417 0-1.28-.492-2.51-1.375-3.438a4.65 4.65 0 0 0-.082-3.455s-1.082-.321-3.584 1.356a12.27 12.27 0 0 0-6.417 0C5.747.596 4.666.917 4.666.917a4.65 4.65 0 0 0-.083 3.455 5 5 0 0 0-1.375 3.465c0 4.969 3.025 6.06 5.904 6.417a3.1 3.1 0 0 0-.862 2.365v3.548"
                    stroke="#fff"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            ) : (
              <div
                {...(!githubLink && {
                  "data-blobity-tooltip": `Privately owned by ${owner}`,
                })}
                data-blobity-magnetic="false"
                className="project-info-top-links-item inactive-link"
              >
                <svg
                  viewBox="0 0 22 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.25 17.417c-4.583 1.375-4.583-2.292-6.417-2.75m12.834 5.5v-3.548a3.1 3.1 0 0 0-.862-2.392c2.878-.321 5.903-1.412 5.903-6.417 0-1.28-.492-2.51-1.375-3.438a4.65 4.65 0 0 0-.082-3.455s-1.082-.321-3.584 1.356a12.27 12.27 0 0 0-6.417 0C5.747.596 4.666.917 4.666.917a4.65 4.65 0 0 0-.083 3.455 5 5 0 0 0-1.375 3.465c0 4.969 3.025 6.06 5.904 6.417a3.1 3.1 0 0 0-.862 2.365v3.548"
                    stroke="#fff"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            )}
          </div>
        </div>

        <div className="project-info-bottom">
          <p className="project-info-bottom-description">{description}</p>

          <div className="project-info-bottom-tags">
            {tags.map((tag, index) => (
              <p key={index + 1} className="project-info-bottom-tags-item">
                {tag}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Project;