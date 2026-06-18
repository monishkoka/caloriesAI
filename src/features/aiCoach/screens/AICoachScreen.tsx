import { PlaceholderScreen } from '@components';
import type { MainTabScreenProps } from '@navigation/types';

export function AICoachScreen(_props: MainTabScreenProps<'AICoach'>) {
  return (
    <PlaceholderScreen
      title="AI Coach"
      subtitle="Conversational nutrition & training guidance via openAiService."
    />
  );
}
