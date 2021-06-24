import { Suspense } from "react";
import { RecoilRoot } from "recoil";
import LearnRecoil from "./LearnRecoil";
import CurrentUserInfo from "./LearnRecoil/CurrentUserInfo";
import ErrorBoundary from "./LearnRecoil/ErrorBoundary";

function App() {
  return (
    <RecoilRoot>
      <ErrorBoundary>
        <Suspense fallback={<div>Loading...</div>}>
          <CurrentUserInfo userID={0} />
        </Suspense>
      </ErrorBoundary>
      <LearnRecoil />
    </RecoilRoot>
  );
}

export default App;
