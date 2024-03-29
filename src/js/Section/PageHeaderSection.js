import { Modal } from "../Component/Modal";
import { DOMHelper } from "../Utility/DOMHelper";

/**
 * A simple section to output the content of the page.
 */
export class PageHeaderSection {
  data;
  previewId;
  title;
  subline;

  constructor(data) {
    this.data = data;
    /**
     * The previewId, name and displayname are always included in the json.
     */
    this.previewId = data.identifier ? data.identifier : "";
    this.title = data?.formData?.pt_title?.value
      ? data?.formData?.pt_title?.value
      : "";
    this.subline = data?.formData?.pt_subline?.value
      ? data?.formData?.pt_subline?.value
      : "";
  }

  /**
   * Creates an HTMLElement with the name and display name of the page
   *
   * @returns {HTMLElement} with the information of the page
   */
  render() {
    const resultElement = DOMHelper.htmlToElement(this.html());
    const devButton = resultElement.querySelector("button");
    devButton.addEventListener("click", (event) => {
      this.showInfoModal();
    });
    return resultElement;
  }

  /**
   * Creates a modal for this section that can be used to display additional
   * information such as the json of the page.
   */
  showInfoModal() {
    const modal = Modal.instance();

    const jsonString = JSON.stringify(this.data, null, 2);
    const codeSnippet = `<pre class="max-h-half-screen overflow-auto language-javascript">
        <code class="language-javascript"></code>
      </pre>`;
    const codeBlock = DOMHelper.htmlToElement(codeSnippet);
    const codeElement = codeBlock.querySelector(".language-javascript");
    codeElement.innerHTML = Prism.highlight(
      jsonString,
      Prism.languages.javascript,
      "javascript"
    );

    modal.show(codeBlock);
  }

  html() {
    return `<section class="w-full relative" data-preview-id="${this.previewId}">
                  <div class="pt-6 ">
                    <div class="flex flex-wrap -mx-4">
                      <div class="w-full px-4 ">
                        <div class="max-w-md lg:max-w-xl mx-auto lg:mx-0">
                          <h1 class="inline-block mb-12 text-4xl font-extrabold tracking-tight text-gray-900" id="content">${this.title}</h1>
                          <p class="mb-4 text-lg text-gray-600 ">${this.subline}</p>                        
                        </div>
                      </div>                      
                    </div>
                  </div>
                  <div class="absolute top-1/4 right-0 translate-x-full m-4 mx-auto rounded-md bg-gray-800 px-1 text-sm text-gray-100 ">
                    <button>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 
                          0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" />
                      </svg>  
                    </button>          
                    <div class="absolute top-0 -z-10 w-4 h-4 origin-top-left transform rotate-45 bg-gray-800 rounded-sm"></div>
                  </div>
                </section>`;
  }
}
