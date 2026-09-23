import io
import re
from typing import Optional

class DocumentParser:
    """
    Robust text extraction engine supporting:
    - PDF (.pdf) via pypdf
    - Word Document (.docx) via python-docx
    - Legacy Word Document (.doc) via stream/text decoder
    - Plain Text (.txt, .md, .rtf) via utf-8 / latin-1
    """

    @staticmethod
    def extract_text_from_bytes(file_bytes: bytes, filename: str) -> str:
        ext = filename.lower().split('.')[-1] if '.' in filename else ''
        
        if ext == 'pdf':
            return DocumentParser.extract_from_pdf(file_bytes)
        elif ext == 'docx':
            return DocumentParser.extract_from_docx(file_bytes)
        elif ext == 'doc':
            return DocumentParser.extract_from_doc(file_bytes)
        else: # txt, md, or default
            return DocumentParser.extract_from_txt(file_bytes)

    @staticmethod
    def extract_from_pdf(file_bytes: bytes) -> str:
        text_parts = []
        try:
            from pypdf import PdfReader
            reader = PdfReader(io.BytesIO(file_bytes))
            for page_num, page in enumerate(reader.pages):
                page_text = page.extract_text()
                if page_text:
                    text_parts.append(page_text)
        except Exception as e:
            # Fallback regex extraction if pypdf hits any unusual PDF formatting
            print(f"[DocumentParser] PDF parsing note: {e}")
            raw_text = file_bytes.decode('latin-1', errors='ignore')
            text_parts.append(re.sub(r'[^\x20-\x7E\n\r\t]', ' ', raw_text))

        return "\n".join(text_parts).strip()

    @staticmethod
    def extract_from_docx(file_bytes: bytes) -> str:
        try:
            import docx
            doc = docx.Document(io.BytesIO(file_bytes))
            full_text = []
            for para in doc.paragraphs:
                if para.text.strip():
                    full_text.append(para.text.strip())
            for table in doc.tables:
                for row in table.rows:
                    row_text = " | ".join(cell.text.strip() for cell in row.cells if cell.text.strip())
                    if row_text:
                        full_text.append(row_text)
            return "\n".join(full_text).strip()
        except Exception as e:
            print(f"[DocumentParser] DOCX parsing fallback: {e}")
            return DocumentParser.extract_from_txt(file_bytes)

    @staticmethod
    def extract_from_doc(file_bytes: bytes) -> str:
        # Extract readable string sequences from binary .doc files
        try:
            # Look for ASCII and Unicode text runs
            text_chars = []
            for b in file_bytes:
                if 32 <= b <= 126 or b in (10, 13, 9):
                    text_chars.append(chr(b))
                elif len(text_chars) > 0 and text_chars[-1] != ' ':
                    text_chars.append(' ')
            raw = "".join(text_chars)
            # Remove long junk sequences
            cleaned = re.sub(r'\s{3,}', '\n', raw)
            return cleaned.strip()
        except Exception as e:
            print(f"[DocumentParser] DOC parsing fallback: {e}")
            return DocumentParser.extract_from_txt(file_bytes)

    @staticmethod
    def extract_from_txt(file_bytes: bytes) -> str:
        for encoding in ('utf-8', 'utf-16', 'latin-1', 'cp1252'):
            try:
                return file_bytes.decode(encoding).strip()
            except UnicodeDecodeError:
                continue
        return file_bytes.decode('utf-8', errors='ignore').strip()

document_parser = DocumentParser()
