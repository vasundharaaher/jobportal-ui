import { Box, Container, Typography } from "@mui/material";

function Footer() {
    return (
        <Box
            sx={{
                mt: 8,
                py: 4,
                background: "#122041",
                color: "#fff",
            }}
        >
            <Container>

                <Typography variant="h6">
                    Contact
                </Typography>

                <Typography>
                    +91-762xxxxxx
                </Typography>

                <Typography>
                    vasundharaaher55@gmail.com
                </Typography>

                <Typography
                    align="center"
                    sx={{ mt: 4 }}
                >
                    © SkillScouter. All Rights Reserved.
                </Typography>

            </Container>
        </Box>
    );
}

export default Footer;