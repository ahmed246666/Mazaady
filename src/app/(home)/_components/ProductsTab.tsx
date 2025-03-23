"use client";

import { useCountdown } from "@/hooks/useCountdown";
import { FakeProducts } from "@/lib/fakeData";
import { cn } from "@/lib/utils";
import { Heart } from "iconsax-react";
import Image from "next/image";

const ProductsTab = () => {
  return (
    <section className="sm:mt-6 mt-3 space-y-8">
      <ProductsHeader />
      {FakeProducts.map((item, index) => (
        <ProductItem key={index} item={item} />
      ))}
    </section>
  );
};

export default ProductsTab;

// ProductsHeader Component
const ProductsHeader = () => (
  <h1 className="sm:text-3xl text-2xl font-extrabold flex items-center gap-2">
    Products{" "}
    <span className="text-sm text-gray text-nowrap font-normal">
      ( {FakeProducts.length} )
    </span>
  </h1>
);

// ProductItem Component
const ProductItem = ({ item }: { item: (typeof FakeProducts)[number] }) => {
  const { days, hours, minutes } = useCountdown(item.LotStartsIn);

  return (
    <div className="flex sm:gap-4 gap-2 sm:mt-6 mt-3">
      <ProductImage item={item} />
      <ProductDetails item={item} days={days} hours={hours} minutes={minutes} />
      <FavoriteIcon item={item} className="max-sm:hidden ml-auto" size="24" />
    </div>
  );
};

// ProductImage Component
const ProductImage = ({ item }: { item: (typeof FakeProducts)[number] }) => (
  <div className="relative rounded-3xl max-sm:rounded-2xl overflow-hidden shrink-0 h-fit">
    <Image
      src={item.image}
      alt={item.name}
      className="w-36 h-32 max-sm:w-24 max-sm:h-20 object-cover rounded-3xl max-sm:rounded-2xl"
    />
    <ProductBadge type={item.type} />
    <div className="absolute top-2 left-2 bg-white rounded-full p-1 sm:hidden">
      <FavoriteIcon item={item}  size="16" />
    </div>
  </div>
);

// ProductBadge Component
const ProductBadge = ({ type }: { type: string }) => (
  <div
    className={cn(
      "absolute bottom-0 text-white right-0 text-xs max-sm:text-[10px] sm:py-2.5 max-sm:py-1.5 w-4/5 text-center sm:rounded-tl-3xl rounded-tl-2xl",
      type === "Hot Sale" ? "bg-secondary" : "bg-primary"
    )}
  >
    {type}
  </div>
);

// ProductDetails Component
const ProductDetails = ({
  item,
  days,
  hours,
  minutes,
}: {
  item: (typeof FakeProducts)[number];
  days: number;
  hours: number;
  minutes: number;
}) => (
  <div className="sm:space-y-3 space-y-2">
    <p className="sm:text-lg truncate xl:max-w-[500px] sm:max-w-[300px] max-w-[150px]">
      {item.name}
    </p>
    <p className="xl:text-lg sm:text-base text-sm capitalize text-gray">
      Starting price{" "}
      <span className="xl:text-2xl sm:text-xl text-base font-bold text-black sm:ml-2">
        {item.startingPrice}
      </span>
    </p>
    <LotStartsIn days={days} hours={hours} minutes={minutes} />
  </div>
);

// LotStartsIn Component
const LotStartsIn = ({
  days,
  hours,
  minutes,
}: {
  days: number;
  hours: number;
  minutes: number;
}) => (
  <div className="flex items-center gap-4 flex-wrap">
    <p className="xl:text-lg sm:text-base text-sm text-nowrap capitalize text-gray">
      Lot starts in
    </p>
    <div className="flex items-center sm:gap-4 gap-2">
      <CountdownBadge value={days} label="days" />
      <CountdownBadge value={hours} label="hours" />
      <CountdownBadge value={minutes} label="minutes" />
    </div>
  </div>
);

// CountdownBadge Component
const CountdownBadge = ({ value, label }: { value: number; label: string }) => (
  <div className="px-4 py-2 max-sm:px-1 rounded-2xl text-nowrap text-sm max-sm:text-[10px] bg-pale text-secondary capitalize font-medium">
    <span className="xl:text-xl sm:text-lg text-sm font-medium">{value}</span>{" "}
    {label}
  </div>
);

// FavoriteIcon Component
const FavoriteIcon = ({
  item,
  className,
  size,
}: {
  item: (typeof FakeProducts)[number];
  className?: string;
  size: string;
}) => (
  <Heart
    size={size}
    color={item.isFavourated ? "#D20653" : "#000000"}
    variant={item.isFavourated ? "Bold" : "Outline"}
    className={cn("shrink-0 cursor-pointer", className)}
  />
);
