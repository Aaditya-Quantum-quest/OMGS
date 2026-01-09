"use client";

import React, { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import GallerySection from "@/components/section/GallerySection";
import Hero from "@/components/section/Hero";
import ShowCase from "@/components/section/ShowCase";
import HeadingTitle from "@/components/ui/HeadingTitle";
import ProductPage from "@/components/section/Products";
import CartSidebar from "@/components/cartSidebar";
import Sidebar from "@/components/section/Sidebar";
import LeftSidedSingleHomeSection from "@/components/section/LeftSidedSingleHomeSection";
import RightSidedSingleHomeSection from "@/components/section/RightSidedSingleHomeSection";
import NameplateShowcase from "@/components/acrylic-nameplate/NameplateShowcase";

const HomeClient = () => {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  // useEffect(() => {
  //   const token =
  //     typeof window !== "undefined" ? localStorage.getItem("token") : null;

  //   if (!token) {
  //     router.replace("/signup");
  //   } else {
  //     setChecking(false);
  //   }
  // }, [router]);

  // if (checking) {
  //   return (
  //     <main className="min-h-screen flex items-center justify-center">
  //       <p className="text-gray-600">Loading...</p>
  //     </main>
  //   );
  // }

  return (
    <Fragment>
      <Sidebar />
      {/* <Hero /> */}
      <LeftSidedSingleHomeSection title="ACRYLIC PHOTO" description="Enjoy brilliant clarity and vivid color reproduction with our premium acrylic prints, made to highlight your images beautifully. Redefine your space with a powerful visual statement that showcases your personal style" videoUrl="https://res.cloudinary.com/dewxpvl5s/video/upload/v1767940770/acrylic-photo_gfimvt.mp4" path="/products/acrylic-photo" />
      <RightSidedSingleHomeSection title="CLEAR ACRYLIC PHOTO" description="Showcase your loved ones in a bold yet refined style with the Prem Color Studios Clear Acrylic Photo. Featuring a custom people-only cutout with the background removed, the transparent finish lets your wall show through for a seamless, modern look" videoUrl="https://res.cloudinary.com/dewxpvl5s/video/upload/v1767940771/clear-acrylic-photo_ntrdrz.mp4" path="/products/clear-acrylic-photo" />
      <LeftSidedSingleHomeSection title="ACRYLIC WALL CLOCK" description="Experience timeless sophistication with the Prem Color Studios Acrylic Clock, where your cherished photo turns a classic timepiece into a stunning décor masterpiece" videoUrl="https://res.cloudinary.com/dewxpvl5s/video/upload/v1767940771/acrylic-wall-clock_ltkhbx.mp4" path="/products/acrylic-wall-clock" />
      <RightSidedSingleHomeSection title="FRAMED ACRYLIC PHOTO" description="Personalize your décor with the Prem Color Studios Framed Acrylic Photo, beautifully crafted to showcase your favorite memories with refined elegance and crystal-clear detail" videoUrl="https://res.cloudinary.com/dewxpvl5s/video/upload/v1767941471/framed-acrylic-photo_defgtk.mp4" path="/products/framed-acrylic-photo" />
      <LeftSidedSingleHomeSection title="COLLAGE ACRYLIC PHOTO" description="Create a stunning visual story with the Prem Color Studios Acrylic Collage Photo, where multiple memories unite in a sleek, modern display" videoUrl="https://res.cloudinary.com/dewxpvl5s/video/upload/v1767940771/collage-acrylic-photo_sgqics.mp4" path="/products/collage-acrylic-photo" />
      <RightSidedSingleHomeSection title="ACRYLIC CUTOUT" description="Transform any space with the Prem Color Studios Acrylic Cutout, crafted with precise detailing and a sleek modern finish to showcase your favorite designs" videoUrl="https://res.cloudinary.com/dewxpvl5s/video/upload/v1767940768/acrylic-cutout_xjnufo.mp4" path="/products/acrylic-cutout"/>
      {/* <LeftSidedSingleHomeSection title="ACRYLIC DESK PHOTO" description="Showcase your cherished memories in a modern and elegant way with the Prem Color Studios Acrylic Standee, featuring a sleek design that brings your favorite photos to life" videoUrl="https://res.cloudinary.com/dewxpvl5s/video/upload/v1767940768/acrylic-cutout_xjnufo.mp4" path="/acrylic-desk-photo" /> */}
      <LeftSidedSingleHomeSection title="ACRYLIC NAMEPLATE" description="Enhance your entrance with the Prem Color Studios Acrylic Nameplate, a stylish and durable solution for doors and outdoor spaces" videoUrl="https://res.cloudinary.com/dewxpvl5s/video/upload/v1767940769/acrylic-nameplate_vchzab.mp4" path="/products/acrylic-nameplate"/>
      {/* <HeadingTitle /> */}
      {/* <ShowCase /> */}
      <GallerySection />
      <NameplateShowcase />
      {/* <ProductPage /> */}
      {/* <CartSidebar /> */}
      {/* <Sidebar /> */}
    </Fragment>
  );
};

export default HomeClient;
