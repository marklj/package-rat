import React, { useEffect, useRef } from "react";

interface PreviewProps {
  code: string;
}

const Preview: React.FC<PreviewProps> = ({ code }) => {
  const iframe = useRef<any>();

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
        <div id="root"></div>
      </body>
    </html>`;

  useEffect(() => {
    iframe.current.srcdoc = iframeHtml;
    setTimeout(() => {
      iframe.current.contentWindow.postMessage(code, "*");
    }, 10);
  }, [code, iframeHtml]);

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
