import { createChatBotMessage } from "react-chatbot-kit";
import BotAvatar from "./BotAvatar";

const config = {
  initialMessages: [
    createChatBotMessage(
      "Hello, I am ShieldHerAI. How can I help you with cyber security today?",
      {
        delay: 500,
      }
    ),
  ],
  botName: "ShieldHerAI",
  customComponents: {
    // You can create a custom BotAvatar component
    botAvatar: (props) => <BotAvatar {...props} />,
  },
  customStyles: {
    botMessageBox: {
      backgroundColor: "#376B7E",
    },
    chatButton: {
      backgroundColor: "#5ccc9d",
    },
  },
  state: {
    currentTopic: null,
    topics: [
      {
        id: 1,
        name: "Online Harassment & Cyberbullying",
        questions: [
          {
            id: 1,
            text: "What is considered online harassment?",
            answer:
              "Online harassment includes behaviors like sending threatening messages, posting embarrassing information, impersonating someone, or repeatedly contacting someone after being asked to stop. These actions are designed to harm, intimidate, or control others online.",
          },
          {
            id: 2,
            text: "What should I do if I'm being cyberbullied?",
            answer:
              "If you're being cyberbullied: 1) Don't respond to the bully, 2) Document everything by taking screenshots, 3) Block the person, 4) Report the behavior to the platform, 5) Talk to someone you trust, and 6) If serious, contact local law enforcement.",
          },
          {
            id: 3,
            text: "How can I report harassment on social media?",
            answer:
              "Most social media platforms have reporting tools. Look for options like 'Report post/comment', 'Report user', or visit the help/support section. Document the harassment with screenshots before reporting, and follow the platform's specific reporting process.",
          },
          {
            id: 4,
            text: "Are there laws against cyberbullying?",
            answer:
              "Yes, many regions have laws addressing cyberbullying and online harassment. These may include anti-harassment laws, anti-stalking provisions, and specific cyberbullying legislation. Law enforcement can take action in serious cases, especially those involving threats or persistent harassment.",
          },
          {
            id: 5,
            text: "How can I help someone who is being cyberbullied?",
            answer:
              "Support them by listening without judgment, helping them document and report the harassment, encouraging them not to respond to the bully, reminding them it's not their fault, and suggesting they speak with a trusted adult, counselor, or mental health professional if needed.",
          },
          {
            id: 6,
            text: "What is doxxing and how can I prevent it?",
            answer:
              "Doxxing involves publishing private information about someone online without permission. Protect yourself by using strong privacy settings, avoiding sharing personal details publicly, using pseudonyms when possible, and regularly searching for your personal information online to request removal if found.",
          },
          {
            id: 7,
            text: "What digital tools can help prevent cyberbullying?",
            answer:
              "Several tools can help: privacy settings on social platforms, blocking features, content filtering software, screenshot tools to document harassment, reporting mechanisms on platforms, and specialized anti-cyberbullying apps that monitor digital communications.",
          },
          {
            id: 8,
            text: "What are the psychological effects of cyberbullying?",
            answer:
              "Cyberbullying can cause anxiety, depression, low self-esteem, feelings of helplessness, social isolation, academic decline, and in severe cases, suicidal thoughts. If experiencing these effects, it's important to seek support from mental health professionals.",
          },
          {
            id: 9,
            text: "How can I help create a positive online environment?",
            answer:
              "Promote positivity online by practicing good digital citizenship, speaking up against bullying, being mindful of your own posts and comments, thinking before sharing, respecting differences, reporting harmful content, and supporting anti-cyberbullying initiatives.",
          },
          {
            id: 10,
            text: "What should schools do about cyberbullying?",
            answer:
              "Schools should develop clear anti-cyberbullying policies, educate students about digital citizenship, train staff to recognize and respond to cyberbullying, provide reporting mechanisms, involve parents, offer counseling for victims, and implement restorative practices for those who bully.",
          },
        ],
      },
      {
        id: 2,
        name: "Identity Theft Protection",
        questions: [
          {
            id: 1,
            text: "What are the common signs of identity theft?",
            answer:
              "Common signs include: unexpected bills or accounts you didn't open, unfamiliar charges on your statements, missing bills or mail, calls from debt collectors about debts that aren't yours, rejected medical claims because your benefits were used up, and notifications about data breaches involving your information.",
          },
          {
            id: 2,
            text: "How can I protect my personal information online?",
            answer:
              "Protect your information by using strong, unique passwords with a password manager, enabling two-factor authentication, being cautious with sharing personal details, checking privacy settings on accounts, using secure networks, being alert to phishing attempts, and regularly monitoring your accounts.",
          },
          {
            id: 3,
            text: "What should I do if my identity is stolen?",
            answer:
              "If your identity is stolen: 1) Contact companies where fraud occurred, 2) Place a fraud alert and get credit reports, 3) Report to the FTC at IdentityTheft.gov, 4) File a police report, 5) Close compromised accounts, 6) Change all passwords, and 7) Continue monitoring your credit.",
          },
          {
            id: 4,
            text: "Are credit monitoring services worth it?",
            answer:
              "Credit monitoring services can be valuable as they alert you to changes in your credit report that might indicate fraud. However, they cannot prevent identity theft—only detect it. Consider if the monthly cost is worth it or if you can monitor your own credit through free annual reports and vigilant account checking.",
          },
          {
            id: 5,
            text: "How do credit freezes work?",
            answer:
              "A credit freeze restricts access to your credit report, making it harder for identity thieves to open accounts in your name. You must place freezes with all three major credit bureaus (Equifax, Experian, TransUnion). When you need to apply for credit, you temporarily lift the freeze using a PIN or password.",
          },
          {
            id: 6,
            text: "What is synthetic identity theft?",
            answer:
              "Synthetic identity theft occurs when criminals combine real and fake information to create a new identity. They might use a real Social Security number with a fake name and address. This type of fraud is harder to detect because it doesn't completely match any one person's profile.",
          },
          {
            id: 7,
            text: "How can I protect my children from identity theft?",
            answer:
              "Protect children by: checking if they have a credit report (they shouldn't), being cautious about sharing their SSN, shredding documents with their information, teaching them about online privacy, freezing their credit, watching for red flags like credit card offers in their name, and using parental controls online.",
          },
          {
            id: 8,
            text: "What are the most common phishing techniques?",
            answer:
              "Common phishing techniques include: emails impersonating trusted companies, fake websites that look legitimate, urgency or threatening language, offers that seem too good to be true, suspicious attachments or links, requests for personal information, and social media messages from cloned accounts of friends or family.",
          },
          {
            id: 9,
            text: "How long does it take to recover from identity theft?",
            answer:
              "Recovery time varies widely depending on the type and extent of the theft. Simple cases might be resolved in a few hours, while complex cases involving multiple accounts, loans, or tax fraud can take months or even years to fully resolve and repair credit.",
          },
          {
            id: 10,
            text: "What information should I never share online?",
            answer:
              "Never share your full Social Security number, complete birth date, mother's maiden name, passwords, PIN numbers, full address, specific account numbers, photos of ID documents, answers to security questions, or your children's personal information on publicly accessible platforms or with unverified contacts.",
          },
        ],
      },
      {
        id: 3,
        name: "Phishing & Scam Prevention",
        questions: [
          {
            id: 1,
            text: "How can I identify a phishing email?",
            answer:
              "Look for these warning signs: urgent or threatening language, generic greetings instead of your name, spelling/grammar errors, suspicious email addresses, requests for personal information, unexpected attachments, suspicious links (hover to see URL), offers too good to be true, and company branding that looks slightly off.",
          },
          {
            id: 2,
            text: "What are current phishing trends and tactics?",
            answer:
              "Current trends include: spear phishing (targeted attacks), business email compromise, COVID-related scams, QR code phishing, smishing (SMS phishing), vishing (voice phishing), social media phishing, clone phishing (copying legitimate emails), and AI-generated content that appears more convincing and grammatically correct.",
          },
          {
            id: 3,
            text: "How do I report a phishing attempt?",
            answer:
              "Report phishing to: 1) The organization being impersonated, 2) Your email provider, 3) The Anti-Phishing Working Group (reportphishing@apwg.org), 4) The FTC at ReportFraud.ftc.gov, 5) The FBI's Internet Crime Complaint Center (IC3), and 6) Forward emails to phishing@irs.gov if they claim to be from the IRS.",
          },
          {
            id: 4,
            text: "What is a spear phishing attack?",
            answer:
              "Spear phishing is a targeted attack where criminals research specific individuals and tailor messages using personal information to gain trust. Unlike mass phishing, these attacks are customized with details about your job, interests, or recent activities, making them much more convincing and dangerous.",
          },
          {
            id: 5,
            text: "How do I protect my elderly relatives from scams?",
            answer:
              "Protect elderly relatives by: discussing common scams with them, setting up email filters, teaching them to verify requests by contacting organizations directly through official channels, installing security software, creating a system where they consult you before financial decisions, and reporting any scams they encounter.",
          },
          {
            id: 6,
            text: "What are common romance scam warning signs?",
            answer:
              "Watch for: profiles with model-like photos, quick professions of love, reluctance to video chat, elaborate stories of hardship, requests for money for emergencies/travel to meet you, plans to meet that always fall through, inconsistencies in their stories, and attempts to isolate you from friends and family who might raise concerns.",
          },
          {
            id: 7,
            text: "How can I verify if a website is legitimate?",
            answer:
              "Check for: a secure connection (https and padlock icon), a privacy policy, contact information, professional design without errors, legitimate customer reviews on external sites, verifiable business registration, secure payment options, and use tools like WHOIS lookups to verify when the domain was created (scam sites are often new).",
          },
          {
            id: 8,
            text: "What should I do if I've already responded to a scam?",
            answer:
              "If you've responded to a scam: 1) Disconnect your device from the internet, 2) Scan for malware, 3) Change all passwords from a clean device, 4) Contact your bank if financial information was shared, 5) Monitor accounts for suspicious activity, 6) Place a fraud alert with credit bureaus, and 7) Report the scam to relevant authorities.",
          },
          {
            id: 9,
            text: "How do cryptocurrency scams work?",
            answer:
              "Common cryptocurrency scams include: fake exchanges or wallets that steal deposits, Ponzi schemes promising high returns, fake giveaways (send coins to receive more back), phishing for wallet keys, fake ICOs, romance scams requesting crypto, impersonation of influencers, and pump-and-dump schemes manipulating coin values.",
          },
          {
            id: 10,
            text: "What are social engineering techniques used by scammers?",
            answer:
              "Social engineering techniques include: pretexting (creating a fabricated scenario), baiting (offering something enticing), quid pro quo (offering a service), tailgating (physically following someone into a secure area), creating urgency or fear, appealing to authority, and exploiting current events or disasters.",
          },
        ],
      },
      {
        id: 4,
        name: "Digital Privacy Protection",
        questions: [
          {
            id: 1,
            text: "How can I check what personal data is available about me online?",
            answer:
              "Search your name in different search engines, check data broker sites (like Spokeo, Whitepages), review social media profiles (including old ones), check public records, use privacy tools like 'Have I Been Pwned' to check for data breaches, and try searching your email address, phone number, and address to see what's linked to them.",
          },
          {
            id: 2,
            text: "What browser settings should I change for better privacy?",
            answer:
              "For better privacy: disable third-party cookies, enable 'Do Not Track', use private browsing mode for sensitive activities, disable location tracking, manage saved passwords securely, clear browsing data regularly, disable autofill for sensitive information, review and limit site permissions, and consider using privacy-focused extensions.",
          },
          {
            id: 3,
            text: "How do I remove my information from data broker sites?",
            answer:
              "To remove information: identify major data brokers (Spokeo, Whitepages, Intelius, etc.), visit each site's opt-out page (usually under 'Privacy'), follow their specific removal process, be persistent as information may reappear, consider using paid removal services for convenience, and maintain regular checks every few months.",
          },
          {
            id: 4,
            text: "What is a VPN and do I need one?",
            answer:
              "A VPN (Virtual Private Network) encrypts your internet connection, hiding your activity from your ISP and making public Wi-Fi safer. Consider using one if you: use public Wi-Fi frequently, want to prevent your ISP from seeing your browsing, need to access geo-restricted content, or want an additional layer of privacy. However, VPNs aren't perfect security solutions.",
          },
          {
            id: 5,
            text: "How can I make my social media accounts more private?",
            answer:
              "Increase privacy by: reviewing and limiting who can see your posts (friends only), disabling location sharing, removing personal details (phone, address, email), checking tagged photos, using strong passwords with 2FA, regularly auditing connected apps, being selective about friend requests, and using available privacy checkup tools.",
          },
          {
            id: 6,
            text: "What should I know about smart home device privacy?",
            answer:
              "For smart home privacy: research device privacy policies before purchasing, change default passwords, create a separate network for IoT devices, disable unnecessary features (especially always-on microphones/cameras), keep firmware updated, review and delete stored data regularly, and consider the privacy implications before connecting new devices.",
          },
          {
            id: 7,
            text: "How do websites track me across the internet?",
            answer:
              "Websites track you using: cookies (first and third-party), browser fingerprinting (identifying your device's unique characteristics), tracking pixels in emails and websites, social media buttons that track even without clicking, local storage, IP address tracking, and cross-device tracking that links your activities across different devices.",
          },
          {
            id: 8,
            text: "What are the best privacy-focused alternatives to common apps?",
            answer:
              "Privacy-focused alternatives include: Signal or ProtonMail for messaging (instead of WhatsApp), DuckDuckGo or Startpage for search (instead of Google), Firefox or Brave for browsers (instead of Chrome), ProtonMail or Tutanota for email, Standard Notes for note-taking, and open-source options for many apps.",
          },
          {
            id: 9,
            text: "How can I minimize my digital footprint?",
            answer:
              "Minimize your digital footprint by: using privacy-focused search engines, limiting social media use or using pseudonyms, using temporary email services for sign-ups, opting out of data collection when possible, regularly deleting unused accounts, being mindful about what you share online, and using tools like ad blockers and tracker blockers.",
          },
          {
            id: 10,
            text: "What privacy rights do I have under laws like GDPR or CCPA?",
            answer:
              "Under these laws, you typically have rights to: access personal data companies have about you, request deletion of your data, opt out of data sales, be informed about data collection practices, correct inaccurate information, data portability (transferring your data), and file complaints if companies don't comply. Specific rights vary by jurisdiction.",
          },
        ],
      },
      {
        id: 5,
        name: "Online Account Security",
        questions: [
          {
            id: 1,
            text: "What makes a password strong and secure?",
            answer:
              "A strong password is: at least 12-16 characters long, combines uppercase and lowercase letters, numbers, and special characters, doesn't use easily guessed information (like your name), isn't a common phrase or pattern, is unique for each account, and ideally is a passphrase of random words with substitutions and symbols added.",
          },
          {
            id: 2,
            text: "How does two-factor authentication work and why should I use it?",
            answer:
              "Two-factor authentication (2FA) adds a second verification step after your password, usually a temporary code from an app, text message, email, or physical key. You should use it because even if someone obtains your password, they still can't access your account without the second factor, significantly reducing the risk of unauthorized access.",
          },
          {
            id: 3,
            text: "What is a password manager and how do I use one?",
            answer:
              "A password manager is a secure application that stores encrypted versions of all your passwords. You only need to remember one master password. To use one: choose a reputable service (like Bitwarden, LastPass, 1Password), create a very strong master password, install browser extensions, let it generate strong unique passwords for each site, and regularly back up your password vault.",
          },
          {
            id: 4,
            text: "How often should I change my passwords?",
            answer:
              "Current best practice is to change passwords only when necessary, not on a fixed schedule. Change passwords immediately if: there's a data breach affecting your accounts, you suspect someone knows your password, you've shared a password, you've used it for a long time on a critical account, or you've used public computers to log in.",
          },
          {
            id: 5,
            text: "What should I do if my account is hacked?",
            answer:
              "If your account is hacked: 1) Reset your password immediately from a secure device, 2) Enable or change two-factor authentication, 3) Check account recovery options and update them, 4) Check for unauthorized changes or activities, 5) Scan for malware, 6) Alert contacts if the account was used to send messages, and 7) Report the breach to the service provider.",
          },
          {
            id: 6,
            text: "How can I secure my email account?",
            answer:
              "Secure your email by: using a strong, unique password, enabling two-factor authentication, being cautious with third-party apps, checking account activity regularly for suspicious logins, using a dedicated email for sensitive accounts, being alert to phishing attempts, keeping your recovery information updated, and considering a secure email provider for sensitive communications.",
          },
          {
            id: 7,
            text: "What are passkeys and how do they improve security?",
            answer:
              "Passkeys are a newer authentication method that replaces passwords with cryptographic key pairs. They improve security by: eliminating phishable passwords, using biometrics like fingerprints for verification, storing authentication on your device rather than servers, making credential theft much harder, and providing a simpler login experience while maintaining strong security.",
          },
          {
            id: 8,
            text: "How do I set up account recovery options securely?",
            answer:
              "Set up recovery options by: using a recovery email address that you check regularly, adding a phone number for verification (consider a Google Voice number for privacy), choosing security questions with answers only you would know (and that aren't easily researched), storing recovery codes in a secure location, and keeping all recovery information updated.",
          },
          {
            id: 9,
            text: "What is credential stuffing and how can I protect against it?",
            answer:
              "Credential stuffing is when attackers use leaked username/password combinations from one breach to try accessing your other accounts. Protect yourself by: using unique passwords for every site, enabling two-factor authentication, checking if your data has been breached (via haveibeenpwned.com), changing compromised passwords immediately, and using a password manager.",
          },
          {
            id: 10,
            text: "How can I check if my accounts have been compromised in data breaches?",
            answer:
              "Check for compromised accounts by: visiting haveibeenpwned.com and entering your email addresses, using identity theft protection services that monitor the dark web, checking breach notification emails (verify they're legitimate), watching for unusual account activity, setting up Google Alerts for your username/email, and monitoring your credit report.",
          },
        ],
      },
    ],
  },
};

export default config;
