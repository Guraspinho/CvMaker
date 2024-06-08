const puppeteer = require('puppeteer');

const Resume = require('../models/resumes');



async function convertToPdf(req,res)
{
  const id = '6660851a57244064bbaa6735'
  
  const sampleResume = await Resume.findOne({_id:id});

  const name = sampleResume.personalDetails.name;
  const email = sampleResume.personalDetails.email;

  const visibility = sampleResume.visibility;
  const photo = sampleResume.photoURL;

  console.log(visibility);
  console.log(name);

  
const something = false;



  const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.setContent(        
        `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Your Name - Resume</title>
          <style>
              @import url("https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap");

              .Resume_1
              {
                padding: 30px;
              }
              .Res1_header
              {
                display: flex;
              }
              .Res1_user_img_wrapper
              {
                position: relative;
                margin-right: 10px;
              }
              .Res1_user_img {
                max-width: 170px;
                max-height: 170px;
              }
              .Res1_header_right {
                width: 100%;
              }
              .Res1_full_name {
                width: 100%;
                font-weight: 900;
                color: #043770;
                font-size: 28px;
                margin-bottom: 13px !important;
                margin-top: 0;
                padding: 0;
                text-transform: uppercase;
              }
              .Res1_full_name::placeholder {
                color: #043770;
              }
              .Res1_header_content {
              }
              .Res1_header_content span {
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-bottom: 4px;
              }
              .Res1_header_content span h3 {
                margin: 0;
                font-size: 16px;
                font-weight: 600;
                width: 105px;
              }
              .Res1_preview_personal {
                font-size: 14px;
                font-weight: 600;
                color: #787878;
                width: calc(100% - 100px);
              }
              a.Res1_preview_personal {
                text-decoration: unset;
                cursor: default;
              }
              .Res1_summary {
                font-size: 14px;
              }

              .Res1_work_item {
                margin-bottom: 15px;
              }
              .Res1_work_item:last-child {
                margin-bottom: 0;
              }
              .Res1_section_subtitle {
                display: flex;
                align-items: baseline;
                justify-content: space-between;
                margin-bottom: 5px;
              }
              .Res1_preview_work_title {
                font-size: 14px;
                font-weight: 600;
                color: #1e1e1e;
              }
              .Res1_data_picker {
                display: flex;
                align-items: center;
              }
              .Res1_work_list {
                display: flex;
                flex-direction: column;
              }
              .Res1_work_list span {
                display: flex;
                margin-bottom: 2px;
                align-items: baseline;
              }
              .Res1_work_list span p {
                margin-bottom: 0px;
                font-size: 13px;
              }
              .Res1_work_list span svg,
              .Res1_additional span svg {
                position: relative;
                top: 3px;
                margin: 0px 7px;
                min-width: 16px;
              }
              .Res1_preview_work_sub {
                font-size: 13px;
              }
              .Res1_preview_edu_sub {
                font-size: 13px;
                margin-bottom: 8px !important;
              }
              .Res1_work_list span svg,
              .Res1_additional span svg {
                position: relative;
                top: 3px;
                margin: 0px 7px;
                min-width: 16px;
              }
              .Res1_additional span {
                display: flex;
                justify-content: space-between;
              }
              .Res1_additional span b {
                width: auto;
                display: flex;
                margin-right: 10px;
                font-size: 14px;
              }
              .Res1_additional_single {
                position: relative;
              }
              .Res1_additional_single span {
                margin-top: 2px;
              }

              .Res1_additional_single_b {
                min-width: 138px;
              }
              .Res1_additionals {
                text-align: left;
                width: 100%;
                font-size: 13px;
                height: 22px;
                display: flex;
                align-items: center;
              }

              /* Section */
              .Res1_section_header {
                font-weight: 600;
                color: #043770;
                text-transform: uppercase;
                margin-bottom: 5px;
                margin-top: 20px;
              }
              .Res1_section_header h2 {
                font-size: 19px;
                margin: 0;
              }

              .Res1_section_header hr {
                display: flex;
                width: 100%;
                height: 2px;
                background: #043770;
                margin: 0;
                opacity: 1;
              }

          </style>
          </head>
        <body>
          <div class="Resume_1">
  <div class="Res1_header">
    {object?.visibility.photo && (
      <div class="Res1_user_img_wrapper">
        <img class="Res1_user_img" src={object?.photoURL} alt="img" />
      </div>
    )}

    <div class="Res1_header_right">
      <p class="Res1_full_name">{object?.personalDetails.name || ""}</p>

      <div class="Res1_header_content">
        <span>
          <h3>Address:</h3>

          <p class="Res1_preview_personal">
            {object?.personalDetails.address || ""}
          </p>
        </span>
        <span>
          <h3>Phone:</h3>

          <p class="Res1_preview_personal">
            {object?.personalDetails.phone || ""}
          </p>
        </span>
        <span>
          <h3>Email:</h3>

          <p class="Res1_preview_personal">
            {object?.personalDetails.email || ""}
          </p>
        </span>
        <span>
          <h3>Linkedin:</h3>
          <a
            href={{object?.personalDetails.website}}
            target="_blank"
            class="Res1_preview_personal"
          >
            {object?.personalDetails.website}
          </a>
        </span>
      </div>
    </div>
  </div>

  {object?.visibility.summary && (
    <div class="Res1_summary" onClick={() => console.log(object)}>
      <div
        class="Res1_section_header"
        style={{ color: object?.visibility.color }}
      >
        <h2>Summary</h2>
        <hr style={{ background: object?.visibility.color }} />
      </div>

      <p class="Res1_summary">{object?.summary || ""}</p>
    </div>
  )}

  {object?.visibility.workExperience && (
    <div class="Res1_work">
      <div
        class="Res1_section_header"
        style={{ color: object?.visibility.color }}
      >
        <h2>Work Experience</h2>
        <hr style={{ background: object?.visibility.color }} />
      </div>

      <div class="Res1_work_tab">
        {object?.workExperience.map((item: any, i: any) => (
          <div class="Res1_work_item" key={i}>
            <div class="Res1_section_subtitle">
              <p class="Res1_preview_work_title">
                {item?.jobTitle || ""}
              </p>

              <div class="Res1_data_picker">
                <p class="Res1_preview_work_title">
                  {item?.startDate || ""}
                </p>
              </div>
            </div>

            <div class="Res1_work_list">
              {item.jobDescription.map((nestedItem: any, j: any) => (
                <span key={j}>
                  <RxDotFilled />

                  <p class="Res1_preview_work_sub">
                    {nestedItem?.descriptionText || ""}
                  </p>
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )}

  {object?.visibility.education && (
    <div class="Res1_education">
      <div
        class="Res1_section_header"
        style={{ color: object?.visibility.color }}
      >
        <h2>Education</h2>
        <hr style={{ background: object?.visibility.color }} />
      </div>

      <div>
        {object?.education.map((item: any, i: number) => (
          <div class="Res1_work_item" key={i}>
            <div class="Res1_section_subtitle">
              <p class="Res1_preview_work_title">
                {item?.degree || ""}
              </p>

              <p class="Res1_preview_work_title">
                {item?.startDate || ""}
              </p>
            </div>

            <p class="Res1_preview_edu_sub">{item?.school || ""}</p>

            <div class="Res1_work_list">
              {item.degreeDescription.map((nestedItem: any, j: any) => (
                <span key={j}>
                  <RxDotFilled />

                  <p class="Res1_preview_work_sub">
                    {nestedItem?.descriptionText || ""}
                  </p>
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )}

  {object?.visibility.certifications && (
    <div class="Res1_additional">
      <div
        class="Res1_section_header"
        style={{ color: object?.visibility.color }}
      >
        <h2>Additional Information</h2>
        <hr style={{ background: object?.visibility.color }} />
      </div>

      <div class="Res1_additional_single">
        {object?.skills.map((item: any, i: any) => (
          <span key={i}>
            <b class="Res1_additional_single_b">
              <RxDotFilled />
              Technical skills:
            </b>

            <p class="Res1_additionals">{object?.skills[i] || ""}</p>
          </span>
        ))}
      </div>
      <div class="Res1_additional_single">
        {object?.languages.map((item: any, i: any) => (
          <span key={i}>
            <b>
              <RxDotFilled />
              Languages:
            </b>

            <p class="Res1_additionals">{object?.languages[i] || ""}</p>
          </span>
        ))}
      </div>
      <div class="Res1_additional_single">
        {object?.certifications.map((item: any, i: any) => (
          <span key={i}>
            <b>
              <RxDotFilled />
              Certifications:
            </b>

            <p class="Res1_additionals">{item?.name || ""}</p>
          </span>
        ))}
      </div>
      <div class="Res1_additional_single">
        {object?.certifications.map((item: any, i: any) => (
          <span key={i}>
            <b>
              <RxDotFilled />
              Awards/Activities:
            </b>

            <p class="Res1_additionals">{item?.organization || ""}</p>
          </span>
        ))}
      </div>
    </div>
  )}
</div>
        </body>
        </html>
        `
    );

    console.log('page content set');
    const pdf = await page.pdf({format: 'A4'});

    await browser.close();


    return pdf;
}


module.exports = {convertToPdf};


//create a style that makes background colour orange




