module ApplicationHelper

  def page_title(page_title)
    content_for(:title) { page_title + " | ИРМ" }
  end

  def short_name(name)
    begin
    return "#{name.split[1][0]+name.split[0][0]}"
    rescue
      return name.split[0][0]
    end  
  end

end
