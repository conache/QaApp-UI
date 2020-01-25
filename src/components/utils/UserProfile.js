import { pathOr } from "ramda";

export class UserProfile {
  
  ROLES = {
    EMPLOYEE: "ROLE_USER",
    COMPANY_ADMIN: "ROLE_COMPANY_ADMINISTRATOR",
    ADMIN: "ROLE_ADMIN"
  };

  ROLE_DISPLAY_NAME = {
    [this.ROLES.EMPLOYEE]: "Employee",
    [this.ROLES.COMPANY_ADMIN]: "Company administrator",
    [this.ROLES.ADMIN]: "Platform administrator",
  }

  constructor(profileJSON) {
    this._jsonProfile = profileJSON;
  }

  getId() {
    return this._jsonProfile?.id;
  }

  getFirstName() {
    return this._jsonProfile?.firstName || '';
  }

  getLastName() {
    return this._jsonProfile?.lastName || '';
  }

  getName() {
    return `${this.getFirstName()} ${this.getLastName()}`;
  }

  isAnswerAuthor(answer) {
    return answer?.userId === this.getId();
  }

  isQuestionAuthor(question) {
    return question?.questionAuthorId === this.getId();
  }

  isCompanyAdmin() {
    return this.getRole() === this.ROLES.COMPANY_ADMIN;
  }

  isEmployee() {
    return this.getRole() === this.ROLES.EMPLOYEE;
  }

  isAdmin() {
    return this.getRole() === this.ROLES.ADMIN;
  }

  getRole() {
    return pathOr('ROLE_USER', ['attributes', 'role', '0'], this._jsonProfile);
  }

  getDisplayRole() {
    return this.ROLE_DISPLAY_NAME[this.getRole()];
  }
}