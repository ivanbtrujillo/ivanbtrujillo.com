export const PlaceholderPost: React.SFC<{}> = () => (
  <div className=" py-4 px-4 hover:bg-background-accent cursor-pointer w-full container">
    <style jsx>{`
      .container > div {
        animation-duration: 3s;
        animation-fill-mode: forwards;
        animation-iteration-count: infinite;
        animation-name: loading;
        animation-timing-function: linear;
        background: #f6f7f8;
        background: linear-gradient(
          to right,
          #eeeeee 8%,
          #dddddd 18%,
          #eeeeee 33%
        );

        position: relative;
      }

      @keyframes loading {
        0% {
          background-position: -468px 0;
        }
        100% {
          background-position: 468px 0;
        }
      }
    `}</style>

    <div className="w-full h-56  mb-4 bg-gray-400"></div>
    <div className="w-16 h-2 bg-gray-400 mb-4"></div>
    <div className="w-64 h-8 bg-background-secondary mb-4"></div>
    <div className="w-full h-4 bg-gray-400 mb-4"></div>
    <div className="w-64 h-4 bg-gray-400 mb-4"></div>
    <div className="w-48 h-4 bg-gray-400 mb-4 "></div>
  </div>
);
