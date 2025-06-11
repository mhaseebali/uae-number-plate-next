"use client";

import React, { useState, useRef } from "react";
import {
  Column,
  Flex,
  Button,
  SmartImage,
  Input,
  Text,
} from "@/once-ui/components";
import styles from "./page.module.css";
import SharjahPlate from "@/components/SharjahPlate";
import html2canvas from "html2canvas";

export default function Home() {
  const [selectedImage, setSelectedImage] = useState<string>(
    "/images/salem/plate-poster.jpg"
  );
  const [plateNumber, setPlateNumber] = useState<string>("");
  const [enterNumber, setEnterNumber] = useState<string>("");
  const containerRef = useRef<HTMLDivElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    }
  };

  const handleEnterNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 2);
    setEnterNumber(value);
  };

  const handlePlateNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 5);
    setPlateNumber(value);
  };

  const handleDownload = async () => {
    if (containerRef.current) {
      try {
        const canvas = await html2canvas(containerRef.current, {
          scale: 2,
          useCORS: true,
          allowTaint: true,
        });
        const image = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = image;
        link.download = "sharjah-plate.png";
        link.click();
      } catch (error) {
        console.error("Error generating image:", error);
      }
    }
  };

  return (
    <Column maxWidth="m" gap="l" horizontal="center" padding="l">
      <div ref={containerRef}>
        <Flex
          position="relative"
          className={styles.instagramPost}
          radius="m"
          overflow="hidden"
        >
          {/* Background Image */}
          <div style={{ position: "relative", width: "100%", height: "100%" }}>
            <SmartImage
              src={selectedImage}
              alt="Plate background"
              fill
              style={{
                objectFit: "cover",
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",    
              }}
            />
          </div>

          {/* Gradient Overlay comment*/}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "100%",
              background:
                "linear-gradient(to top, rgba(92, 86, 78, 1) 0%, rgba(92, 86, 78, 1) 15%, rgba(92, 86, 78, 0) 40%)",
              pointerEvents: "none",
            }}
          />

          {/* Sharjah Plate Component */}
          <SharjahPlate plateNumber={plateNumber} enterNumber={enterNumber} />
        </Flex>
      </div>

      <Flex gap="m" vertical="center" style={{ marginTop: "-20px" }}>
        <Text variant="body-default-m">Enter Number:</Text>
        <Input
          id="enterNumber"
          label="Enter Number"
          value={enterNumber}
          onChange={handleEnterNumberChange}
          placeholder="Enter number (max 2 digits)"
          style={{ width: "200px" }}
          labelAsPlaceholder
        />
      </Flex>

      <Flex gap="m" vertical="center" style={{ marginTop: "-20px" }}>
        <Text variant="body-default-m">Plate Number:</Text>
        <Input
          id="plateNumber"
          label="Plate Number"
          value={plateNumber}
          onChange={handlePlateNumberChange}
          placeholder="Enter plate number (max 5 digits)"
          style={{ width: "200px" }}
          labelAsPlaceholder
        />
      </Flex>

      <Flex gap="m" style={{ marginTop: "-10px" }}>
        <Button
          variant="secondary"
          size="m"
          onClick={() => document.getElementById("imageUpload")?.click()}
        >
          Upload Background Image
        </Button>
        <Button variant="primary" size="m" onClick={handleDownload}>
          Download Image
        </Button>
      </Flex>
      <input
        id="imageUpload"
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        style={{ display: "none" }}
      />
    </Column>
  );
}
