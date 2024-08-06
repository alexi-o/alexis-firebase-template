import React from "react";
import ReactMarkdown from "react-markdown";
import { Box, Container, Typography, useTheme } from "@mui/material";

const markdown = `
# Alexi O'Hearn

- **Phone**: (757) 613-7969
- **Email**: ohearnalexi@gmail.com

## Professional Experience

### Senior Frontend Developer
**Beam · SaaS Brand Management Platform · Remote**  
**2024 - Present**

- Played a key role as part of a small core team that built a new SaaS product from scratch, evolving from our proprietary CMS application.
- Helped lead the design and implementation of the infrastructure and database architecture, ensuring scalability and efficiency.
- Architected and developed core components and made crucial decisions on tooling and frameworks, including the transition to Nuxt 3 for server-side rendering.
- Collaborated closely with Design and Product teams to develop seamless integrations between our platform and Figma, streamlining the workflow from design to development.
- Utilized technologies such as VueJs, PHP, Lumen, CircleCI, Jest, Docker, Cypress, and Figma to deliver high-quality, maintainable code.
- Continuously improved the application by adopting best practices and new technologies, ensuring optimal performance and user experience.

### Senior Frontend Developer
**Monigle · Brand Marketing Agency · Denver, CO**  
**2020 - 2023**

- Used VueJs and Laravel to build and maintain a wide variety of features within our proprietary CMS application.
- Worked closely with Design and Product to develop integrations between our platform and Figma to speed up the process between site designs and development.
- Developed a new SASS version of our application utilizing Nuxt 3 for server-side rendering.
- Technologies used: VueJs, PHP, Lumen, CircleCI, Jest, Docker, Cypress, Figma.

### Web Developer
**Diablo Media · Digital Marketing Agency · Denver, CO**  
**2017 - 2020**

- Created custom landing pages and click funnels for the product team.
- Developed and implemented new features on our internal web applications while upgrading/migrating to more modern frameworks.
- Technologies used: jQuery, AngularJS, Angular, React, PHP, Node/NPM, Gulp/Grunt, CircleCI, Jenkins, Phabricator.

## Skills & Expertise

- **JavaScript**
- **Vue.js**
- **React**
- **Python**
- **PHP**
- **Laravel**
- **CI/CD**
- **Testing**: Jest, Cypress

## Education

### Bachelor of Arts - Communications
**Virginia Wesleyan University**  
**2013 - 2017**

### Web Development Immersive
**General Assembly**  
**2017**

---

**Software Developer** with a strong foundation in Vue.js and JavaScript, and a proven ability to work effectively in fast-paced, remote environments.
`;

const AboutPage = () => {
  const theme = useTheme();

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Box
        sx={{
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.primary,
          padding: "20px",
          borderRadius: "8px",
          boxShadow: `0 4px 8px rgba(0, 0, 0, 0.1)`,
        }}
      >
        <ReactMarkdown children={markdown} />
      </Box>
    </Container>
  );
};

export default AboutPage;
