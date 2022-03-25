import React, { useEffect, useRef } from "react";
import "./preview.css";

interface PreviewProps {
  code: string;
  error: string;
}

const Preview: React.FC<PreviewProps> = ({ code, error }) => {
  const iframe = useRef<any>();

  const iframeHtml = `
    <html>
      <head>
        <script>
          const handleError = (error) => {
            const root = document.querySelector('#root');
            root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + error + '</div>';
            console.error(error);
          }

          window.addEventListener('error', (event) => {
            event.preventDefault();
            handleError(event.error);
          });

          window.addEventListener('message', (event) => {
            try {
              eval(event.data);
            } catch (error) {
              handleError(error);
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
    }, 150);
  }, [code, iframeHtml]);

  return (
    <div className="preview-wrapper">
      <iframe
        title="preview"
        ref={iframe}
        sandbox="allow-scripts"
        frameBorder="0"
        srcDoc={iframeHtml}
      />
      {error && (
        <div className="absolute top-0 left-0 text-red-500">{error}</div>
      )}
    </div>
  );
};

export default Preview;
