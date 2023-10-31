module ApplicationHelper

  def page_title(title)
    content_for(:title) { title + " | " + I18n.t("app_name") }
  end

  def short_name(name)
    begin
    return "#{name.split[1][0]+name.split[0][0]}"
    rescue
      return name.split[0][0]
    end  
  end

end
