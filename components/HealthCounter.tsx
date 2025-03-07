import { usePetInfo } from "@/contexts/UserContext";
import { ThemedText } from "@/components/ThemedText";

const HealthCounter = () => {
  const { health } = usePetInfo();
  return (
    <ThemedText type="default" lightColor="#fff" darkColor="#000">
      {health}%
    </ThemedText>
  );
};

export default HealthCounter;
