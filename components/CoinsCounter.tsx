import { usePetInfo } from "@/contexts/UserContext";
import { ThemedText } from "@/components/ThemedText";

const CoinsCounter = () => {
  const { coins } = usePetInfo();
  return (
    <ThemedText type="default" lightColor="#fff" darkColor="#000">
      {coins}
    </ThemedText>
  );
};

export default CoinsCounter;
