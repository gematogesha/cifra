module ApplicationHelper
  def inclination(count, one, few, many)
    return many if (count % 100).between?(11, 14)
    
    case count % 10
    when 1 then one
    when 2..4 then few
    else
      many
    end
  end

	
	def title(page_title)
		content_for(:title) { page_title }
	end

  def short_name(name)
    begin
    return "#{name.split[1][0]+name.split[0][0]}"
    rescue
      return name.split[0][0]
    end  
  end

end
