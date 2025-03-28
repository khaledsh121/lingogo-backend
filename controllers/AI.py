import imaplib
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.firefox.options import Options
import time

firefox_options = Options()
firefox_options.add_argument("--disable-extensions")
firefox_options.add_argument("--disable-popup-blocking")


def execute_steps(driver):
    try:

        driver.get("https://gemini.google.com/app")

        time.sleep(1)

        driver.execute_script(f"""
                const quillInstance = Quill.find(document.querySelector('.ql-container'));

                quillInstance.setSelection(quillInstance.getLength());

                quillInstance.insertText(quillInstance.getLength(), "translate the word cat into Arabic and provide 10 example sentences using this word along with their Arabic translations. Use Arabic language for the translations.", 'user');
                const sendButton = document.querySelector('.mdc-icon-button.mat-mdc-icon-button.mat-mdc-button-base.send-button.ng-tns-c2534238634-2.submit.mat-unthemed');
                sendButton.click()
                                      """)
        time.sleep(5)

        value = ""
        newValue = ""

        while True:
            value = newValue
            time.sleep(2)  # يمكنك استبداله بـ WebDriverWait لو أردت تحسين الأداء
            
            newValue = driver.execute_script("""
                const panel = document.querySelector('.markdown.markdown-main-panel');
                return panel?.textContent || "";
            """)

            if value == newValue:
                break  # الخروج عند عدم وجود تغييرات

        return newValue
        pass
    except Exception as e:  # Align with try
        print(f"Unexpected error: {e}")
        driver.save_screenshot("error_screenshot.png")



# الدالة الرئيسية
def main():

    driver = webdriver.Firefox(options=firefox_options)
    execute_steps(driver)




if __name__ == "__main__":
    
    main()
