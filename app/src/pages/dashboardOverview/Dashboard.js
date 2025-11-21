import {
  CashStatus,
  Diagrams,
  RecentTransactions,
  PageTemplate,
} from "./Index.js";

const Dashboard = {
  render() {
    return PageTemplate.render([
      CashStatus.render(),
      Diagrams.render(),
      RecentTransactions.render()
    ]);
  },

  init() {
    Diagrams.init();
  }
};

export default Dashboard;




// const Dashboard = {
//   render() {
//     return PageTemplate.render([
//       Container.render([
//         CashStatus.render(),
//         Diagrams.render()
//       ]),
//       RecentTransactions.render()
//     ]);
//   },
//
//   init() {
//     Diagrams.init();
//   }
// };
//
// export default Dashboard;



// <div
//   className="w-full p-[16px] flex flex-col tablet:px-[24px]
//                   laptop:gap-[16px] laptop:h-full laptop:flex-row"
// >
//
//   <article
//     className="h-full w-full flex flex-col gap-[16px] mobile:h-include-top
//                     laptop:h-full laptop:flex-row  "
//   >
//     <section
//       className="h-include-top w-full flex flex-col gap-[8px]
//                           mobile:h-full laptop:w-fit laptop:min-w-[270px]"
//     >
//       <h3 className="text-[24px] capitalize">Cash Status</h3>
//       <div
//         className="h-full w-full  flex flex-col gap-[8px]
//                          mobile:gap-[16px] laptop:h-full laptop:flex-row"
//       >
//         ${CardsList.render()}
//       </div>
//     </section>
//
//     <section
//       className="h-screen w-full flex flex-col gap-[8px] pt-[16px]
//                           mobile:h-full laptop:pt-0"
//     >
//       <h3 className="text-[24px] capitalize">Diagrams</h3>
//       <div
//         className="h-full w-full flex flex-col gap-[16px]
//                         mobile:flex-row laptop:flex-col "
//       >
//         ${BudgetChart.render()}
//         ${MonthlyComparisonChart.render()}
//       </div>
//     </section>
//   </article>
//
//   <section
//     className="h-screen w-full pt-[32px] flex flex-col gap-[8px]
//                         laptop:h-full laptop:w-2/3 laptop:py-0"
//   >
//     <h3 className="text-[24px]   capitalize">Recent Transactions</h3>
//     <div className="h-full w-full   gradient-secondary rounded-[15px]">
//       ${CardsList.render()}
//     </div>
//   </section>
//
// </div>
