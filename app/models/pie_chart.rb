class PieChart
    attr_reader :name, :color, :count
  
    def initialize(name, color, count)
        @name = name
        @color = color
        @count = count
    end
  
    def present?
        @count.present?
    end
end
  