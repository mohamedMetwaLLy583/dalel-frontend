"use client";

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { RiEarthLine } from "react-icons/ri";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import styles from "./navbar.module.css";

const drawerWidth = 240;

export default function NavBar(props) {
  const { locale } = props;

  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [logo, setLogo] = React.useState(null);

  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations();

  React.useEffect(() => {
    const fetchLogo = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_DBURL}/api/setting/logo`,
          {
            headers: {
              Accept: "application/json",
            },
            next: { revalidate: 5000 },
          }
        );
        const data = await response.json();
        setLogo(data.dark_logo);
      } catch (error) {
        console.error("Failed to fetch the logo:", error);
      }
    };

    fetchLogo();
  }, []);

  const navItemsAr = [
    { label: t("Navbar.home"), path: `/${locale}`, icon: "/icons/home.svg" },
    {
      label: t("Navbar.rent"),
      path: `/${locale}/for-rent`,
      icon: "/icons/agent.svg",
    },
    {
      label: t("Navbar.sale"),
      path: `/${locale}/for-sale`,
      icon: "/icons/sale.svg",
    },
    {
      label: t("Navbar.about"),
      path: `/${locale}/about-us`,
      icon: "/icons/i.svg",
    },
    {
      label: t("Navbar.contact"),
      path: `/${locale}/contact-us`,
      icon: "/icons/phone.svg",
    },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleChangeLang = () => {
    const forattedPath = pathname.split("/");
    router.replace(
      `/${forattedPath[1] === "en" ? "ar" : "en"}/${
        forattedPath[2] ? forattedPath[2] : ""
      }${forattedPath[3] ? `/${forattedPath[3]}` : ""}`
    );
  };

  const drawer = (
    <Box sx={{ textAlign: "center", padding: "15px" }}>
      <Typography onClick={handleDrawerToggle} variant="div" sx={{ my: 2 }}>
        <Link href={`/`}>
          {logo && (
            <img
              className="w-[210px] h-[61px]"
              style={{ margin: "0 auto" }}
              src={logo}
              alt="Logo"
              draggable="false"
            />
          )}
        </Link>
      </Typography>

      <List className="mt-[20px]">
        {navItemsAr.map((item, index) => (
          <ListItem key={index} onClick={handleDrawerToggle} disablePadding>
            <ListItemButton
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "10px", // Spacing between icon and text
                textAlign: "left",
              }}
            >
              <img
                src={item.icon} // Dynamically fetch the icon path
                alt={`${item.label} Icon`} // Accessibility alt text
                width={24}
                height={24}
                style={{ marginRight: "10px" }} // Adjust spacing if needed
              />
              <Link href={item.path}>
                <Typography
                  sx={{
                    fontSize: "14px", // Set font size to 14px
                    fontWeight: "700", // Set font weight to 700
                    color: "#18AD8F", // Set text color to #18AD8F
                    fontFamily: "inherit",
                    // Ensure consistent font family
                  }}
                >
                  {item.label}
                </Typography>
              </Link>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        position: "sticky",
        top: "-1px",
        zIndex: 40,
        backgroundColor: "transparent",
      }}
    >
      <CssBaseline />
      <AppBar
        component="nav"
        position={"static"}
        sx={{
          backgroundColor: "#fff",
          transition: "0.3s ease-in-out",
          boxShadow: "none",
        }}
      >
        <Toolbar className="px-[16px] md:px-[50px] xl:px-[120px] flex justify-between items-center h-[56px] lg:h-[95px]">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{
              marginLeft: locale === "ar" ? 2 : 0,
              marginRight: locale === "en" ? 2 : 0,
              display: { md: "none" },
              padding: "0",
            }}
          >
            <MenuIcon className="text-custom-maincolor" />
          </IconButton>
          <Typography
            component="div"
            sx={{
              marginLeft: {
                xs: locale === "ar" ? "35px" : "0px",
                lg: locale === "ar" ? "0" : "0px",
              },
              marginRight: {
                xs: locale === "en" ? "35px" : "0px",
                lg: locale === "en" ? "0" : "0px",
              },
              display: { xs: "flex", sm: "block" },
              justifyContent: { xs: "end" },
              minWidth: "63px",
              minHeight: "32px",
            }}
          >
            <Link href={`/`} className=" w-full">
              {logo && (
                <img
                  src={logo}
                  // src="/logo.svg"
                  className="h-[80px] object-contain w-[200px] lg:w-[250px]"
                  alt="Logo"
                  width={150}
                  height={50}
                  draggable="false"
                />
              )}
            </Link>
          </Typography>
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              justifyContent: "space-between",
              flexGrow: 1,
              position: "relative",
            }}
          >
            <Box
              sx={{
                order: 2,
                display: "flex",
                justifyContent: "center",
                gap: "40px",
                flexGrow: 1,
              }}
            >
              {navItemsAr.map((item, index) => (
                <Link key={index} href={item.path}>
                  <Typography
                    className={`${styles.nav_link} ${
                      item.path === pathname && styles.active
                    }`}
                    sx={{
                      fontFamily: "inherit",

                      color: item.path === pathname ? "#18AD8F" : "#7A7A7A",
                      fontSize: "18px",
                      fontWeight: "500",
                      position: "relative",
                      "&::after": {
                        content: '""',
                        position: "absolute",
                        bottom: "-8px",
                        [locale === "ar" ? "right" : "left"]: "0",
                        width: item.path === pathname ? "50%" : "0%",
                        height: "2px",
                        backgroundColor:
                          item.path === pathname ? "#18AD8F" : "transparent",
                        transition:
                          "width 0.6s ease-in-out, background-color 0.6s ease-in-out",
                      },
                      "&:hover::after": {
                        backgroundColor: "#18AD8F",
                        width: "50%",
                      },
                    }}
                  >
                    {item.label}
                  </Typography>
                </Link>
              ))}
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              flexGrow: 1,
              margin: { xs: "24px", md: "0" },
              gap: "8px",
            }}
          >
            <button
              onClick={handleChangeLang}
              className="flex items-center gap-x-[5px] font-almarai justify-center content-center"
            >
              <p
                className="font-almarai font-medium mt-[1px] "
                style={{
                  color: "#18AD8F",
                  fontSize: "20px",
                }}
              >
                {t("Navbar.locale")}
              </p>
              <RiEarthLine
                color="#18AD8F"
                style={{ width: "20px", height: "20px" }}
              />
            </button>
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          variant="temporary"
          anchor={locale == "ar" ? "right" : "left"}
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          PaperProps={{
            sx: {
              background: "#fff",
              color: "#18AD8F",
            },
          }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
}
