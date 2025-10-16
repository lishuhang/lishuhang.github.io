
import os
import re
import datetime

def process_markdown_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    front_matter_pattern = re.compile(r'^---\s*$(.*?)^---\s*$', re.DOTALL | re.MULTILINE)
    match = front_matter_pattern.match(content)

    front_matter = {}
    body_content = content
    front_matter_block = ''

    if match:
        front_matter_block = match.group(1)
        for line in front_matter_block.split('\n'):
            if ':' in line:
                key, value = line.split(':', 1)
                front_matter[key.strip()] = value.strip()
        body_content = content[match.end():].strip()

    front_matter_image_url = front_matter.get('image')

    # Find the first image in the body content
    # Markdown image pattern: ![alt text](url "title") or ![alt text](url)
    body_image_pattern = re.compile(r'!\s*\[[^\]]*\]\s*\((.*?)(?:\s+".*?")?\)')
    body_image_match = body_image_pattern.search(body_content)

    new_body_content = body_content
    updated_front_matter_image = front_matter_image_url
    file_modified = False

    if body_image_match:
        first_body_image_full_match = body_image_match.group(0)
        first_body_image_url = body_image_match.group(1)

        if front_matter_image_url and front_matter_image_url == first_body_image_url:
            # Scenario 1: Front matter has an image, and the first body image URL is identical.
            # Delete the first image from the body.
            new_body_content = body_content.replace(first_body_image_full_match, '', 1).strip()
            file_modified = True
        elif not front_matter_image_url:
            # Scenario 2: Front matter has no image, but the body has a first image.
            # Delete the first image from the body and move its URL to the front matter.
            new_body_content = body_content.replace(first_body_image_full_match, '', 1).strip()
            updated_front_matter_image = first_body_image_url
            file_modified = True

    if file_modified:
        # Reconstruct front matter
        new_front_matter_lines = []
        for key, value in front_matter.items():
            if key == 'image':
                new_front_matter_lines.append(f'{key}: {updated_front_matter_image}')
            else:
                new_front_matter_lines.append(f'{key}: {value}')
        
        if 'image' not in front_matter and updated_front_matter_image:
            new_front_matter_lines.append(f'image: {updated_front_matter_image}')

        new_front_matter_block = '\n'.join(new_front_matter_lines)
        
        # Reconstruct the entire file content
        if match:
            # If there was an existing front matter block
            new_content = f'---\n{new_front_matter_block}\n---\n\n{new_body_content}'
        else:
            # If there was no existing front matter block but we need to add one
            if updated_front_matter_image:
                new_content = f'---\nimage: {updated_front_matter_image}\n---\n\n{new_body_content}'
            else:
                new_content = content # No front matter and no image to add, so no change

        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        return True
    return False

def main():
    log_filename = None
    try:
        current_directory = os.getcwd()
        markdown_files = [f for f in os.listdir(current_directory) if f.endswith('.md')]

        for md_file in markdown_files:
            print(f"Processing {md_file}...")
            process_markdown_file(os.path.join(current_directory, md_file))
        print("Script finished successfully.")

    except Exception as e:
        timestamp = datetime.datetime.now().strftime("%Y%m%d_%H%M%S")
        log_filename = f"log_{timestamp}.txt"
        with open(log_filename, 'w', encoding='utf-8') as log_file:
            log_file.write(f"An error occurred: {e}\n")
            log_file.write(f"Error details:\n{traceback.format_exc()}")
        print(f"An error occurred. Details logged to {log_filename}")

if __name__ == "__main__":
    import traceback # Import traceback here for logging
    main()

