"use client";

import { ArrowUp2, DocumentDownload, Eye } from "iconsax-react";
import { Share2 } from "lucide-react";
import React, { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import Logo from "@/images/mazaady-logo.webp";
import QR from "@/images/qr-code.webp";
import { Button } from "@/components/ui/button";

const COLLAPSABlE_ITEMS = [
  { icon: Eye, color: "#000000", action: "view" },
  { icon: Share2, color: "#000000", action: "share" },
  { icon: DocumentDownload, color: "#000000", action: "download" },
] as const;

const Collapsable = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleCollapsable = () => setIsOpen((prev) => !prev);

  return (
    <div
      className={cn(
        "space-y-4 overflow-hidden transition-all",
        !isOpen ? "max-h-8" : "max-h-[500px]"
      )}
    >
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <p className="text-2xl max-sm:text-xl font-bold">QR Code</p>
        <div className="flex justify-center items-center gap-6">
          {COLLAPSABlE_ITEMS.map((item, index) => (
            <Button variant={"noStyle"} size={"icon"} key={index}>
              <item.icon
                size="20"
                color={item.color}
                className="cursor-pointer sm:size-6"
                aria-label={`${item.action} QR Code`}
              />
            </Button>
          ))}
          <ToggleButton isOpen={isOpen} onClick={toggleCollapsable} />
        </div>
      </div>

      {/* Info Banner */}
      <InfoBanner />

      {/* QR Code Section */}
      {isOpen && <QRCodeSection />}
    </div>
  );
};

export default Collapsable;

// ToggleButton Component
export const ToggleButton = ({
  isOpen,
  onClick,
}: {
  isOpen: boolean;
  onClick: () => void;
}) => (
  <Button
  variant={"noStyle"}
    className="bg-[#FBE7EE] hover:bg-[#FBE7EE] p-1 rounded-full cursor-pointer lg:hidden h-fit"
    onClick={onClick}
    role="button"
    aria-label={isOpen ? "Collapse" : "Expand"}
  >
    <ArrowUp2
      size="16"
      color="#000000"
      className={cn(
        "transition-transform duration-500 sm:size-5",
        isOpen ? "rotate-0" : "rotate-180"
      )}
    />
  </Button>
);

// InfoBanner Component
const InfoBanner = () => (
  <div className="bg-pale rounded-2xl p-4 flex items-center gap-2">
    <DocumentDownload
      size="24"
      color="#FF951D"
      variant="TwoTone"
      className="cursor-pointer"
    />
    <p className="text-[#333333] text-sm">
      Download the QR code or share it with your friends.
    </p>
  </div>
);

// QRCodeSection Component
const QRCodeSection = () => (
  <div className="bg-gradient rounded-2xl p-5">
    <div className="bg-white rounded-2xl p-4 flex flex-col items-center justify-center">
      <Image src={Logo} alt="Mazaady Logo" />
      <h2 className="text-2xl max-sm:text-xl font-bold my-3">Hala Ahmed</h2>
      <Image src={QR} alt="QR-code" />
      <p>Follow Us on Mazaady</p>
    </div>
  </div>
);
