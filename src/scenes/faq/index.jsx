import { Box, useTheme, Typography } from "@mui/material";
import Header from "@/components/Header";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { tokens } from "@/theme";

const faqItems = [
  {
    id: 1,
    question: "How can I join your website and access the content?",
    answer:
      "To join our website, click on the 'Sign Up' link at the top of the page and fill out the registration form. After submitting your information, your user account will be created, and you will have access to exclusive content.",
  },
  {
    id: 2,
    question: "How can I change my account password?",
    answer:
      "To change your account password, log in to your account and go to the 'Account Settings' section. In this section, you will find an option to change your password. After entering your current password and the new password, the changes will be saved.",
  },
  {
    id: 3,
    question: "Can I share the website's content with others?",
    answer:
      "Yes, you can share our website's content. Click on the 'Share' button available on the content page and share it via social media or use the direct link to share it.",
  },
  {
    id: 4,
    question: "Are the contents translated into other languages?",
    answer:
      "Yes, some of our website's content is translated into other languages. You can access different languages from the settings menu and view the content in your preferred language.",
  },
  {
    id: 5,
    question: "How can I contact customer support?",
    answer:
      "To contact our support team, you can use the 'Contact Us' form on the Contact page or send an email to support@example.com. Our team will respond to you as soon as possible.",
  },
  {
    id: 6,
    question: "Is my account information secure?",
    answer:
      "Yes, we take high-security measures to protect your account information. Your data is encrypted and secured using appropriate security measures to prevent unauthorized access.",
  },
];

const FAQ = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m={"20px"}>
      <Header title={"FAQ"} subtitle={"Frequently Asked Questions Page"} />

      {faqItems.map((item) => (
        <Accordion defaultExpanded key={item.id} sx={{ marginTop: "10px" }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography color={colors.greenAccent[500]} variant="h5">
              {item.question}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{item.answer}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

export default FAQ;
