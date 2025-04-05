import { Grid, Typography, Box, Chip } from '@mui/material';

import { Download } from 'react-feather';

const manuals = [
  {
    title: 'A Handbook For Students on Cyber Safety (English)',
    link: 'https://cybercrime.gov.in/UploadMedia/CyberSafetyEng.pdf',
    isNew: false
  },
  {
    title: 'Handbook for Tackling Cyber Crimes',
    link: 'https://cybercrime.gov.in/UploadMedia/TSWSW-HandbookforTacklingCyberCrimes.pdf',
    isNew: false
  },
  {
    title: 'Cyber Awareness and Hygiene for Parents',
    link: '#',
    isNew: true,
    description: (
      <>
        <strong>Talk to your children about the potential online threats</strong> such as grooming, bullying, and stalking, keep track of their online activities. Set clear guidelines for internet and online games usage.
        <br />
        <strong>Notice indicators of change in behaviour:</strong> If your child begins to spend more time online and starts being defensive or secretive about their online activities, it may be an indicator of cyber grooming. Talk to your child and engage him/her in other activities.
        <br />
        <strong>Protect your child from Cyber Grooming:</strong> Grooming is a practice where someone builds an emotional bond with a child through social media or chat windows with an objective of gaining their trust for sexual exploitation.
        <br />
        Children may remove privacy settings on social media to make more friends. Parents should discuss responsible use of social media. Also, they should educate and help them in selecting strong privacy settings.
        <br />
        <strong >Never click suspicious links or attachments:</strong> Never click on links or files received in e-mail, text message, or social media from an unknown person. This may be an attempt to infect the computer with malware.
        <br />
        <strong>Cover your webcams:</strong> A web camera (default in laptops) if hacked/compromised can be leveraged as a medium to observe/watch and record day-to-day activities. It is recommended to cover the webcam when not in use.
        <br />
        <strong>Install anti-virus software’s with parental control functionality:</strong> Install parental control software on the devices used by children and review their privacy settings on social media sites.
      </>
    )
  },
  {
    title: 'Cyber Security Best Practices',
    link: '#',
    isNew: false,
     description :(
        <>
          <p>
            <strong>Secure your online presence just like you secure yourself:</strong> If you have not selected the right settings on your social media accounts, then photos and videos posted can be viewed, downloaded, and used by others without your knowledge.
            <br />
            Select the right privacy settings and content sharing filters on social media so that you are sharing your information, photos, and videos only with your trusted ones.
            <br />
            Be selective about accepting friend requests from strangers on social media.
            <br />
            Learn how to block someone who is making you uncomfortable.
            <br />
            Learn how to remove someone from your friends list.
            <br />
            Remember to log out from social media websites after use.
            <br />
            Secure your phone with a password.
            <br />
            If you notice your fake account has been created, you can immediately inform the social media service provider so that the account can be blocked.
            <br />
            <strong>Be mindful of your appearance on video chat & video calls:</strong> Your video chats on social media sites can be recorded by the person on the other side.
            <br />
            There have been instances where video chats, which were supposed to be private, have been recorded and shared on social media groups and websites.
            <br />
            Be careful while accepting chat requests from strangers.
            <br />
            <strong>Do not use Smartphones for taking sensitive personal photographs and videos:</strong> Most smartphones are connected to the internet and cloud storage. If a picture or video has been clicked/recorded by using a smartphone connected with the cloud, it may get saved automatically into the cloud.
            <br />
            Even if users delete their photos or videos from their phone, the same photo or video can be recovered from the cloud account or any other device/PC connected to the cloud using the same account.
            <br />
            If someone has taken such a photograph using a smartphone, take it seriously and make sure to get it deleted from their smartphone, the cloud, and any other device connected using the same account.
            <br />
            <strong>Protect yourself from Cyber stalking:</strong> Cyber stalkers show advances on a person repeatedly despite clear indication of disinterest by such person. They use the internet, email, social media, or any other form of electronic communication for stalking.
          </p>
        </>
      )
      
  },

 
  {
    title: 'Digital Literacy for Citizens',
    link: '#',
    isNew: false,
    description :(
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <p>
            <strong>How to deal with Child Pornography (CP)/ Child Sexual Abuse Material (CSAM) or sexually explicit material in the workplace?</strong>
            <br />
            All organizations should have clear and strong HR policies on how to deal with content on Child Pornography (CP)/ Child Sexual Abuse Material (CSAM) or sexually explicit material.
            <br />
            Organizations should have clear rules for the use of electronic devices provided by the organization.
            <br />
            If any employee is found possessing obscene or indecent content, proper investigation and action should be taken against them.
            <br />
            The organization should report any incidence of sharing and storage of obscene content within the organization to the police. The copy of the content should be saved as evidence with restricted access.
            <br />
            All other copies of the content should be deleted.
            <br />
            They can also report through the National Cyber Crime Reporting Portal (www.cybercrime.gov.in).
            <br />
            <strong>Publication, Collection, and Distribution of Child Pornography (CP)/ Child Sexual Abuse Material (CSAM) or sexually explicit material is illegal:</strong>
            <br />
            Under Section 67 and 67A of the Information Technology Act, 2000, the publication and distribution of any material containing sexually explicit acts or conduct in electronic form is a punishable offense.
            <br />
            Section 67B of the IT Act criminalizes browsing, downloading, creation, publication, and distribution of child pornography.
            <br />
            Be safe, Browse safe!
          </p>
        </div>
      )
  }
];

const CyberSecurityTips = () => {
  return (
    <Box
      sx={{
        maxWidth: '1200px',
        margin: 'auto',
        mt: 6,
        mb: 6,
        p: 8,
        borderRadius: '32px',
        boxShadow: '0 15px 15px rgba(0, 255, 255, 0.3)',
        backgroundColor: '#1a2634',
        border: '1px solid #3f4a5a',
      }}
    >
      <Grid container direction="column" spacing={3}>
        {manuals.map((manual, index) => (
          <Grid
            item
            key={index}
            sx={{
              p: 3,
              borderRadius: '16px',
              backgroundColor: '#253242',
              mb: index !== manuals.length - 1 ? '20px' : '0',
              display: 'flex',
              alignItems: 'flex-start', // Aligning items to the left
              justifyContent: 'flex-start', // Aligning to the left
              transition: '0.3s',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: '0 0 5px rgba(0, 255, 255, 0.5)',
              },
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column', textAlign: 'left' }}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: manual.description ? 3 : 2 }}>
                {(index < 2) && ( // Only show the download icon for the first two manuals
                  <Box sx={{ mr: 2, color: '#00ffff' }}>
                    <Download size={24} />
                  </Box>
                )}

                <a
                  href={manual.link}
                  style={{
                    textDecoration: 'none',
                    color: 'white',
                    flexGrow: 1,
                    textAlign: 'left' // Ensuring the text aligns to the left
                  }}
                >
                  {manual.title}
                </a>
              </Box>

              {manual.description && (
                <Typography variant="body2" color="#b0bec5" sx={{ textAlign: 'left' }}>
                  {manual.description}
                </Typography>
              )}
            </Box>

            {manual.isNew && (
              <Chip
                label="NEW"
                sx={{
                  backgroundColor: '#ff6b6b',
                  color: 'white',
                  fontWeight: 'bold',
                  ml: 2,
                  boxShadow: '0 0 12px rgba(255, 107, 107, 0.7)',
                }}
              />
            )}
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CyberSecurityTips;
