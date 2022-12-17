import { Injectable } from '@nestjs/common';
import { CreateArticle, UpdateArticle } from 'src/common/dto/article.input';
import { UpdateImage } from 'src/common/dto/site.input';
import { MarketingArticle } from 'src/common/entities/article.model';
import { ArticleDocument } from 'src/common/entities/article.schema';
import { ListInput } from 'src/common/pagination/dto/list.input';
import { slug } from 'utils/function';
import { MarketingArticlesRepository } from './marketing-articles.repository';

console.log(slug('JavaScript - Made Easy From The Beginning to Advanced'));
console.log(slug('PHP with MySQL 2022: Build a Complete Job Portal'));

@Injectable()
export class MarketingArticlesService {
  constructor(
    private readonly articleRepository: MarketingArticlesRepository,
  ) {}

  async create(input: CreateArticle) {
    const data = await this.articleRepository.add(input);
    return this.toModel(data);
  }
  async update(input: UpdateArticle) {
    const data = await this.articleRepository.update(input);
    return this.toModel(data);
  }
  async updateImage(input: UpdateImage) {
    const data = await this.articleRepository.updateImage(input);
    return this.toModel(data);
  }

  async deleteArticle(id: string) {
    await this.articleRepository.deleteOne({ _id: id });
    return id;
  }

  async deleteArticlesById(ids: string[]) {
    await this.articleRepository.deleteMany({ _id: { $in: ids } });
    return ids;
  }

  async deleteAllArticles() {
    await this.articleRepository.deleteMany({});
    return 'articles deleted';
  }

  async getArticle(id: string) {
    const document = await this.articleRepository.findOne({ _id: id });
    return this.toModel(document);
  }
  async getArticleBySlug(siteId: string, slug: string) {
    const document = await this.articleRepository.findOne({
      siteId: siteId,
      slug: slug,
    });
    return this.toModel(document);
  }
  getArticles() {
    return this.articleRepository.find({});
  }

  getArticlesByParentId(parentId: string) {
    return this.articleRepository.find({ parentId: parentId });
  }
  getArticlesBySiteId(siteId: string) {
    return this.articleRepository.find({ siteId: siteId });
  }

  all(pagination: ListInput, parentId: string) {
    return this.articleRepository.All(pagination, { parentId: parentId });
  }

  private toModel({
    _id,
    dataArticle,
    slug,
    siteId,
    parentId,
  }: ArticleDocument): MarketingArticle {
    return {
      _id: _id.toHexString(),
      dataArticle: dataArticle,
      slug: slug,
      siteId: siteId,
      parentId: parentId,
    };
  }
}
