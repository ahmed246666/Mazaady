import { Card, CardContent } from "@/components/ui/card";
import Collapsable from "./Collapsable";

const QRAccordion = () => {
  return (
    <Card className="col-span-2">
      <CardContent>
        <Collapsable />
      </CardContent>
    </Card>
  );
};

export default QRAccordion;
