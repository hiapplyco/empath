
import { useSearchParams } from "react-router-dom";
import { AuthContainer } from "@/components/auth/AuthContainer";
import { AuthTabs } from "@/components/auth/AuthTabs";

export default function Auth() {
  const [searchParams] = useSearchParams();
  const isCaregiver = searchParams.get("role") === "caregiver";

  return (
    <AuthContainer isCaregiver={isCaregiver}>
      <AuthTabs isCaregiver={isCaregiver} />
    </AuthContainer>
  );
}
