"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import ConfigText from "@/components/admin/ConfigText";
import Snackbar from "@mui/material/Snackbar";
import { useEffect, useState } from "react";
import Alert from '@mui/material/Alert';


export default function ConfigHomePage() {
  const router = useRouter();
  const { data: session } = useSession();
  console.log("Session data:", session);

  const [isSnackbarOpen, setSnackbarOpen] = useState(false);

  const openSnackbar = () => {
    setSnackbarOpen(true);
  };

  // useEffect(() => {
  //   console.log("SHOW SNACKBARRRR:", isSnackbarOpen);
  // }, [isSnackbarOpen]);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="h-screen w-full flex flex-col">
        <ConfigText
          label="Hero Section Text"
          required
          page="home"
          section="hero"
          type="heading"
          lang="th"
          openSnackbar={openSnackbar}
        />
      </div>
      <Snackbar
        open={isSnackbarOpen}
        autoHideDuration={4000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert severity="success">Text changed successfully!</Alert>
      </Snackbar>
    </div>
  );
}
