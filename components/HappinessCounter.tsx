import { usePetInfo } from "@/contexts/UserContext";
import { ThemedText } from "@/components/ThemedText";

const HappinessCounter = () => {
  const { happiness } = usePetInfo();
  return (
    <ThemedText type="default" lightColor="#fff" darkColor="#000">
      {happiness}%
    </ThemedText>
  );
};

export default HappinessCounter;
