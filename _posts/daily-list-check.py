
import os
import re
import datetime
import traceback

def process_markdown_list_spacing(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    modified_lines = []
    file_modified = False

    for line in lines:
        # Check for lines that start with two spaces followed by '- '
        # and are not part of a code block or other indented content
        if re.match(r'^  - ', line):
            # Replace '  - ' with '- '
            modified_lines.append(re.sub(r'^  - ', '- ', line, 1))
            file_modified = True
        else:
            modified_lines.append(line)

    if file_modified:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.writelines(modified_lines)
        return True
    return False

def main():
    log_filename = None
    try:
        current_directory = os.getcwd()
        markdown_files = [f for f in os.listdir(current_directory) if f.endswith('.md')]

        for md_file in markdown_files:
            print(f"Processing {md_file} for list spacing...")
            if process_markdown_list_spacing(os.path.join(current_directory, md_file)):
                print(f"Modified {md_file}")
            else:
                print(f"No changes needed for {md_file}")
        print("Script finished successfully.")

    except Exception as e:
        timestamp = datetime.datetime.now().strftime("%Y%m%d_%H%M%S")
        log_filename = f"log_{timestamp}.txt"
        with open(log_filename, 'w', encoding='utf-8') as log_file:
            log_file.write(f"An error occurred: {e}\n")
            log_file.write(f"Error details:\n{traceback.format_exc()}")
        print(f"An error occurred. Details logged to {log_filename}")

if __name__ == "__main__":
    main()

