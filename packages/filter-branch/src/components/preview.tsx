import React, { useEffect, useRef } from "react";

interface PreviewProps {
  code: string;
}

const Preview: React.FC<PreviewProps> = ({ code }) => {
  const iframe = useRef<any>();
  let loaded = false;

  const iframeHtml = `
    <html>
      <head>
        <script>
            window.addEventListener('message', (event) => {
              try {
                eval(event.data);
              } catch (error) {
                const root = document.querySelector('#root');
                root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + error + '</div>';
                console.error;
              }
            }, false)
          </script>
        </head>
      <body>
        Result:
        <div id="root"></div>
      </body>
    </html>`;

  const postMessage = () => {
    iframe.current.contentWindow.postMessage(code, "*");
    setTimeout(() => {
      postMessage();
    }, 10);
  };

  useEffect(() => {
    console.log("effect");
    iframe.current.srcdoc = iframeHtml;
    postMessage();
  }, [code]);

  return (
    <iframe
      title="preview"
      ref={iframe}
      sandbox="allow-scripts"
      frameBorder="0"
      srcDoc={iframeHtml}
    />
  );
};

export default Preview;
