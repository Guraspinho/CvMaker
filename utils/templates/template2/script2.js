const object = {
  personalDetails: {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "123-456-7890",
    address: "123 Main St, Anytown, USA",
    socialMediaLinks: "Cv Maker",
    profession: "",
  },
  workExperience: [
    {
      jobTitle: "Mechatronics Engineer, Borcelle Technologies 00",
      startDate: "Jan 2023 Present",
      // endDate: "",
      jobDescription: [
        {
          descriptionText:
            "Led development of an advanced automation system, achieving a 15% increase in operational efficiency.",
        },
        {
          descriptionText:
            "Designed and optimised a robotic control system, realizing a 12% performance improvement.",
        },
      ],
    },
  ],
  education: [
    {
      degree: "Bachelors in System Engineer, Arrowai Industries",
      school: "Georgian Technical University",
      startDate: "Feb 2021 Dec 2022",
      // endDate: "",
      degreeDescription: [
        {
          descriptionText:
            "Implemented preventive maintenance strategies, resulting in a 20% decrease in equipment downtime.",
        },
        {
          descriptionText:
            "Provided technical expertise, contributing to a 15% reduction in system failures. Junior Project Engineer, Salford & Co Manufacturing",
        },
      ],
    },
  ],
  links: [
    {
      title: "GitHub",
      url: "https://github.com/johndoe",
    },
    {
      title: "LinkedIn",
      url: "https://linkedin.com/in/johndoe",
    },
  ],
  certifications: [
    {
      name: "AWS Certified Developer",
      organization: "Outstanding Leadership Award",
      date: "2020-01-01",
      email: "",
      phone: "",
    },
  ],
  projects: [
    {
      name: "Web Application",
      description: "A web application for managing tasks",
      link: "2020",
    },
  ],
  skills: ["Microsoft Office, Adobe Programs"],
  skillsSection2: [
    {
      singleSkill: "Designing for print",
    },
    {
      singleSkill: "User Interface (UI) Design",
    },
  ],
  languages: ["megruli, spanish, Georgian"],
  pdfURL: "https://example.com/johndoe.pdf",
  photoURL:
    "https://m.media-amazon.com/images/M/MV5BOWU4MTI2OTctODQ1ZS00MGM1LWJkM2EtODE3MGNkNmIyZDEwXkEyXkFqcGdeQXVyMjQwMDg0Ng@@.V1_FMjpg_UX1000.jpg",
  summary:
    "I am a Web Developer with over 2 year of experience planning, designing, testing, and maintaining digital products. I'm a passionate frontend developer with a keen eye for design and a love focrafting user-friendly, responsive web experiences. I bring a blend of creativity and technical expertise to every project, striving for pixel-perfect perfection. Eager to collaborate and stay on the cutting edge of web development trends.",
};

document.addEventListener("DOMContentLoaded", function () {
  const resume2 = document.getElementById("resume2");

  // Generate work experience HTML
  let workExperienceHTML = "";
  object.workExperience.forEach((item) => {
    workExperienceHTML += `
        <div class="resume2_work_item">
          <div class="resume2_section_subtitle">
            <p class="resume2_exp_title">${item.jobTitle}</p>
            <div class="resume2_data_picker">
              <p class="resume2_data_picker_input">${item.startDate}</p>
            </div>
          </div>
          <div class="resume2_work_list">
            ${item.jobDescription
              .map(
                (desc) => `
              <span>
                <p class="resume2_preview_work_sub">${desc.descriptionText}</p>
              </span>
            `
              )
              .join("")}
          </div>
        </div>
      `;
  });

  // Generate projects HTML
  let projectsHTML = "";
  if (object.projects) {
    projectsHTML = `
      
        ${object.projects
          .map(
            (item, i) => `
          <span key=${i}>
            <div>
              <h2 class="reference_title">${item.name}</h2>
              <h3 class="reference_name">${item.description}</h3>
            </div>
            <h3 class="reference_date">${item.link}</h3>
          </span>
        `
          )
          .join("")}
      
    `;
  }

  const htmlContent = `
      <div class="resume2_left" style="background: #123456;">
        <div class="resume2_left_side">
          <div class="resume2_img_upload_wrapper">
            <div class="resume2_img_upload" ></div>
          </div>
    
          <div class="resume2_left_content">
            <div class="section_header" style="color: #fff;">
              <div class="resume2_hr">
                <h2>Contact Me</h2>
              </div>
              <hr  />
            </div>
    
            <div class="resume2_left_contact">
              <span>
                <img src="./assets/icons/phone.svg" alt="">
                <p class="resume2_preview_contact">${
                  object.personalDetails.phone
                }</p>
              </span>
              <span>
                <img src="./assets/icons/gmail.svg" alt="">
                <p class="resume2_preview_contact">${
                  object.personalDetails.email
                }</p>
              </span>
              <span>
                <img src="./assets/icons/in.svg" alt="">
                <p class="resume2_preview_contact">${
                  object.personalDetails.website
                }</p>
              </span>
              <span>
                <img src="./assets/icons/location.svg" alt="">
                <p class="resume2_preview_contact">${
                  object.personalDetails.address
                }</p>
              </span>
            </div>
    
            <div class="section_header" style="color: #fff;">
              <div class="resume2_hr">
                <h2>Education</h2>
              </div>
              <hr  />
            </div>
    
            <div class="resume2_left_education">
              ${object.education
                .map(
                  (item) => `
                <span>
                  <p class="resume2_edu_title">${item.startDate}</p>
                  <p class="resume2_edu_title">${item.degree}</p>
                </span>
              `
                )
                .join("")}
            </div>
    
            <div class="section_header" style="color: #fff;">
              <div class="resume2_hr">
                <h2>Skills</h2>
              </div>
              <hr  />
            </div>
    
            <div class="resume2_left_skills">
              ${object.skills
                .map(
                  (skill) => `
                <span>
                  <p class="resume2_skills_p">${skill}</p>
                </span>
              `
                )
                .join("")}
            </div>
    
            <div class="section_header" style="color: #fff;">
              <div class="resume2_hr">
                <h2>Languages</h2>
              </div>
              <hr  />
            </div>
    
            <div class="resume2_left_language">
              ${object.languages
                .map(
                  (language) => `
                <span>
                  <p class="resume2_skills_p">${language}</p>
                </span>
              `
                )
                .join("")}
            </div>
          </div>
        </div>
      </div>
    
      <div class="resume2_right">
        <div class="resume2_right_side">
          <div class="resume2_name_wrapper2">
            <p class="resume2_full_name">${object.personalDetails.name}</p>
            <p class="resume2_profe">Software Engineer</p>
          </div>
    
          <div class="section_header" style="color: #123456;">
            <div class="resume2_hr">
              <h2>About Me</h2>
            </div>
            <hr  />
          </div>
    
          <p class="resume2_summary_p">${object.summary}</p>
    
          <div class="section_header" style="color: #123456;">
            <div class="resume2_hr">
              <h2>Work Experience</h2>
            </div>
            <hr  />
          </div>
    
          ${workExperienceHTML}
    
          <div class="section_header" style="color: #123456;">
            <div class="resume2_hr">
              <h2>Awards</h2>
            </div>
            <hr  />
          </div>

          
          <div class="references">
          ${projectsHTML}
            
          </div>
        </div>
      </div>
    `;

  resume2.innerHTML = htmlContent;
});
