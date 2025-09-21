import { useEffect, useState } from "react";
import { fetchTemplates } from "../services/barberService";
import { Card, 
  CardContent, 
  Typography, 
  // Grid,
   Button } from "@mui/material";
import type { HaircutTemplateDocument } from "../types";
import CustomizeHaircut from "./CustomizeHaircut";
import Grid from "@mui/material/Grid";

const HaircutTemplates = () => {
  const [templates, setTemplates] = useState<HaircutTemplateDocument[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] =
    useState<HaircutTemplateDocument | null>(null);

  const handleOpen = (template: HaircutTemplateDocument) => {
    setSelectedTemplate(template);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedTemplate(null);
  };

  useEffect(() => {
    const loadTemplates = async () => {
      try {
        const data = await fetchTemplates();
        setTemplates(data);
      } catch (err) {
        console.error("Error fetching templates:", err);
      }
    };
    loadTemplates();
  }, []);

  return (
    <>
      <Grid container spacing={3} sx={{ mt: 3 }}>
        {templates.map((t) => (
          <Grid item xs={12} sm={6} md={4} key={t._id}>
            <Card key={t._id}>
              <CardContent>
                <Typography variant="h6">{t.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {t.description}
                </Typography>
                <Button
                  onClick={() => handleOpen(t)}
                  variant="contained"
                  sx={{ mt: 2 }}
                >
                  Customize
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <CustomizeHaircut
        open={open}
        onClose={handleClose}
        template={selectedTemplate}
        mode="create"
      />
    </>
  );
};

export default HaircutTemplates;
