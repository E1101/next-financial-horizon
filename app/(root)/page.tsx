import HeaderBox from "@/components/HeaderBox";
import RightSideBar from "@/components/RightSideBar";
import TotalBalanceBox from "@/components/TotalBalanceBox";

export default function HomePage() {
  const loggedIn = {
    firstName: "John",
    lastName: "Doe",
    email: "mail@email.com",
  };

  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <HeaderBox
            type="greeting"
            title="Welcome"
            user={loggedIn?.firstName}
            subtext="Access and manage your account and transactions effeciently."
          />
          <TotalBalanceBox
            accounts={[]}
            totalBanks={1}
            totalCurrentBalance={42365.8}
          />
        </header>
        RECENT TRANSACTIONS
      </div>

      <RightSideBar user={loggedIn} transactions={[]} banks={[{}, {}]} />
    </section>
  );
}
