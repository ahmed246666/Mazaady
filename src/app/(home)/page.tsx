import { Card, CardHeader } from "@/components/ui/card";
import ProfileCard from "./_components/ProfileCard";
import QRAccordion from "./_components/QRAccordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AddCircle } from "iconsax-react";
import { Button } from "@/components/ui/button";
import ProductsTab from "./_components/ProductsTab";

export default function Home() {
  return (
    <div className="mainContainer grid xl:grid-cols-3 lg:grid-cols-5 grid-cols-1 gap-5 sm:my-12 my-5">
      <aside className="xl:col-span-1 lg:col-span-2 col-span-1 sm:space-y-5 space-y-4">
        <ProfileCard />
        <QRAccordion />
      </aside>
      <main className=" xl:col-span-2 lg:col-span-3 col-span-1">
        <Card>
          <CardHeader>
            <Tabs defaultValue="Products">
              <div className="flex justify-between">
                <TabsList>
                  <TabsTrigger value="Products" className="cursor-pointer">
                    Products
                  </TabsTrigger>
                  <TabsTrigger value="Articles" className="cursor-pointer">
                    Articles
                  </TabsTrigger>
                  <TabsTrigger value="Reviews" className="cursor-pointer">
                    Reviews
                  </TabsTrigger>
                </TabsList>
                <Button
                  variant="main"
                  className="max-md:fixed max-md:top-1/2 max-md:right-3 max-md:-translate-y-1/2"
                  aria-label="Add Review"
                >
                  <AddCircle size="20" color="#FFFFFF" variant="Outline" />
                  Add Review
                </Button>
              </div>
              <TabsContent value="Products">
                <ProductsTab />
              </TabsContent>
              <TabsContent value="Articles">
                Change your Articles here.
              </TabsContent>
              <TabsContent value="Reviews">
                Change your Reviews here.
              </TabsContent>
            </Tabs>
          </CardHeader>
        </Card>
      </main>
    </div>
  );
}
