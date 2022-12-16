export default class Content {
  private content: string;

  get value() {
    return this.content;
  }

  private validateContent(content: string) {
    return content.length >= 5 && content.length <= 240;
  }

  constructor(content: string) {
    const isContentValid = this.validateContent(content);
    if (!isContentValid) {
      throw new Error('Content length not valid');
    }
    this.content = content;
  }
}
