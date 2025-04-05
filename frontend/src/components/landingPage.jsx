import React from 'react';
import {
    Box,
    Typography,
    Button,
    Card,
    CardContent,
    Avatar,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Container,
    Paper,
    Divider,
    Chip,
    Grid
} from '@mui/material';
import bannerImage from "../assets/bannerImage.jpg"
import { testimonials } from '../data/testimonial'
import { faqs } from '../data/faqs'
import { features } from '../data/features'
import { howItWorks } from '../data/howItWorks'
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const HeroSection = styled(Box)(({ theme }) => ({
    paddingTop: theme.spacing(16),
    paddingBottom: theme.spacing(10),
    textAlign: 'center',
    position: 'relative',
    overflow: 'hidden',
}));

const FeatureCard = styled(Card)(({ theme }) => ({
    height: '100%',
    backgroundColor: 'transparent',
    border: '1px solid white',
    borderRadius: '12px',
    transition: 'transform 0.3s, box-shadow 0.3s',
    '&:hover': {
        transform: 'translateY(-8px)',
        boxShadow: theme.shadows[8],
    },
}));

export default function LandingPage() {

    return (
        <div className='scroll-hidden'>
            <HeroSection>
                <Container maxWidth="md">
                    <Typography
                        variant="h2"
                        component="h1"
                        sx={{
                            fontWeight: 700,
                            mb: 4,
                            background: 'linear-gradient(to bottom, #9ca3af, #e5e7eb, #4b5563)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                        }}
                    >
                        Browse Safely with ShieldHer
                    </Typography>

                    <Typography
                        variant="h5"
                        component="p"
                        sx={{ mb: 6, maxWidth: 700, mx: 'auto', color: 'white' }}
                    >
                        Protect yourself from malicious websites with our advanced URL scanner.
                        Get instant safety ratings before you click.
                    </Typography>

                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                        <Button
                            variant="contained"
                            color="primary"
                            sx={{ fontWeight: 600 }}
                            component={Link}
                            to="/signup"
                        >
                            Get Started Free
                        </Button>
                        <Button
                            variant="outlined"
                            color="primary"
                            sx={{ fontWeight: 600 }}
                            component={Link}
                            to="/login"
                        >
                            See How It Works
                        </Button>
                    </Box>
                </Container>
                <div className="mt-5">
                    <img
                        src={bannerImage}
                        alt="Dashboard Preview"
                        style={{ borderRadius: '6px', marginTop: '50px' }}
                        className="rounded-lg shadow-2xl mx-auto w-full max-w-4xl"
                        width={1150}
                        height={720}
                    />
                </div>
            </HeroSection>

            {/* Features Section */}
            <Box sx={{ py: 4 }}>
                <Container maxWidth="lg">
                    <Typography
                        variant="h4"
                        component="h2"
                        align="center"
                        gutterBottom
                        sx={{ fontWeight: 700, mb: 6 }}
                    >
                        Powerful Protection Features
                    </Typography>

                    <Grid container spacing={4}>
                        {features.map((feature, index) => (
                            <Grid item xs={12} sm={6} md={3} key={index}>
                                <FeatureCard>
                                    <CardContent sx={{ textAlign: 'center', p: 4 }}>
                                        <Box sx={{ mb: 2 }}>
                                            {feature.icon}
                                        </Box>
                                        <Typography variant="h6" component="h3" gutterBottom sx={{ color: 'white', fontWeight: 600 }}>
                                            {feature.title}
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: 'grey' }}>
                                            {feature.description}
                                        </Typography>
                                    </CardContent>
                                </FeatureCard>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>

            {/* Stats Section */}
            <Box sx={{ py: 6 }}>
                <Container maxWidth="md">
                    <Grid container spacing={4} justifyContent="center">
                        <Grid item xs={6} sm={3}>
                            <Box textAlign="center">
                                <Typography variant="h3" color="primary" gutterBottom>
                                    10M+
                                </Typography>
                                <Typography variant="subtitle1">
                                    URLs Scanned
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={6} sm={3}>
                            <Box textAlign="center">
                                <Typography variant="h3" color="primary" gutterBottom>
                                    99.9%
                                </Typography>
                                <Typography variant="subtitle1">
                                    Accuracy Rate
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={6} sm={3}>
                            <Box textAlign="center">
                                <Typography variant="h3" color="primary" gutterBottom>
                                    24/7
                                </Typography>
                                <Typography variant="subtitle1">
                                    Protection
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={6} sm={3}>
                            <Box textAlign="center">
                                <Typography variant="h3" color="primary" gutterBottom>
                                    500K+
                                </Typography>
                                <Typography variant="subtitle1">
                                    Happy Users
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            {/* How It Works */}
            <Box sx={{ py: 6 }}>
                <Container maxWidth="lg">
                    <Typography
                        variant="h4"
                        component="h2"
                        align="center"
                        gutterBottom
                        sx={{ fontWeight: 700, mb: 6 }}
                    >
                        How ShieldHer Works
                    </Typography>

                    <Grid container spacing={4}>
                        {howItWorks.map((step, index) => (
                            <Grid item xs={12} sm={6} md={3} key={index}>
                                <Box textAlign="center" sx={{ px: 2 }}>
                                    <Box sx={{
                                        width: 80,
                                        height: 80,
                                        bgcolor: 'white',
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        mx: 'auto',
                                        mb: 3
                                    }}>
                                        {step.icon}
                                    </Box>
                                    <Typography variant="h6" component="h3" gutterBottom>
                                        {step.title}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: 'grey' }}>
                                        {step.description}
                                    </Typography>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>

            {/* Testimonials */}
            <Box sx={{ py: 6 }}>
                <Container maxWidth="lg">
                    <Typography
                        variant="h4"
                        component="h2"
                        align="center"
                        gutterBottom
                        sx={{ fontWeight: 700, mb: 6 }}
                    >
                        What Our Users Say
                    </Typography>

                    <Grid container spacing={4}>
                        {testimonials.map((testimonial, index) => (
                            <Grid item xs={12} md={4} key={index}>
                                <Paper elevation={3} sx={{ p: 3, height: '100%', backgroundColor: 'transparent', border: '1px solid grey', borderRadius: '12px' }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                                        <Avatar
                                            alt={testimonial.name}
                                            src={testimonial.avatar}
                                            sx={{ width: 56, height: 56, mr: 2 }}
                                        />
                                        <Box>
                                            <Typography variant="subtitle1" fontWeight="bold" color='white'>
                                                {testimonial.name}
                                            </Typography>
                                            <Typography variant="body2" color="grey">
                                                {testimonial.role}
                                            </Typography>
                                        </Box>
                                    </Box>
                                    <Typography variant="body1" fontStyle="italic" color='white'>
                                        "{testimonial.quote}"
                                    </Typography>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>

            {/* FAQ */}
            <Box sx={{ py: 6 }}>
                <Container maxWidth="md">
                    <Typography
                        variant="h4"
                        component="h2"
                        align="center"
                        gutterBottom
                        sx={{ fontWeight: 700, mb: 6 }}
                    >
                        Frequently Asked Questions
                    </Typography>

                    <Box>
                        {faqs.map((faq, index) => (
                            <Accordion key={index} elevation={3} sx={{ mb: 2, backgroundColor: 'transparent', border: '1px solid grey', borderRadius: '10px' }}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}>
                                    <Typography variant="subtitle1" fontWeight="bold" sx={{ color: 'white' }}>
                                        {faq.question}
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails sx={{ color: 'grey' }}>
                                    <Typography>
                                        {faq.answer}
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                        ))}
                    </Box>
                </Container>
            </Box>

            {/* CTA */}
            <Box sx={{
                py: 6,
                background: 'linear-gradient(to bottom, #9ca3af, #e5e7eb, #4b5563)',
                color: 'common.white'
            }}>
                <Container maxWidth="md" sx={{ textAlign: 'center' }}>
                    <Typography
                        variant="h3"
                        component="h2"
                        gutterBottom
                        sx={{ fontWeight: 700, mb: 3, color: 'black' }}
                    >
                        Ready to Browse Safely?
                    </Typography>
                    <Typography variant="h6" sx={{ mb: 5, color: 'grey' }}>
                        Join thousands of users who trust ShieldHer for their online safety.
                    </Typography>
                    <Button
                        variant="contained"
                        size="large"
                        component={Link}
                        to="/signup"
                        sx={{
                            px: 6,
                            py: 1.5,
                            fontSize: '1.1rem',
                            fontWeight: 'bold',
                            backgroundColor: 'black'
                        }}
                    >
                        Get Started Free
                    </Button>
                </Container>
            </Box>
        </div>
    );
}