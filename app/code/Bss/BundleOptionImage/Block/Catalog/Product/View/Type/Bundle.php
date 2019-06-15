<?php
/**
 * BSS Commerce Co.
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the EULA
 * that is bundled with this package in the file LICENSE.txt.
 * It is also available through the world-wide-web at this URL:
 * http://bsscommerce.com/Bss-Commerce-License.txt
 *
 * =================================================================
 *                 MAGENTO EDITION USAGE NOTICE
 * =================================================================
 * This package designed for Magento COMMUNITY edition
 * BSS Commerce does not guarantee correct work of this extension
 * on any other Magento edition except Magento COMMUNITY edition.
 * BSS Commerce does not provide extension support in case of
 * incorrect edition usage.
 * =================================================================
 *
 * @category   BSS
 * @package    Bss_BundleOptionImage
 * @author     Extension Team
 * @copyright  Copyright (c) 2015-2016 BSS Commerce Co. ( http://bsscommerce.com )
 * @license    http://bsscommerce.com/Bss-Commerce-License.txt
 */
namespace Bss\BundleOptionImage\Block\Catalog\Product\View\Type;

class Bundle extends \Magento\Bundle\Block\Catalog\Product\View\Type\Bundle
{
    protected $productloader;

    protected $helper;

    protected $helperimage;

    public function __construct(
        \Magento\Catalog\Block\Product\Context $context,
        \Magento\Framework\Stdlib\ArrayUtils $arrayUtils,
        \Magento\Catalog\Helper\Product $catalogProduct,
        \Magento\Bundle\Model\Product\PriceFactory $productPrice,
        \Magento\Framework\Json\EncoderInterface $jsonEncoder,
        \Magento\Framework\Locale\FormatInterface $localeFormat,
        \Magento\Catalog\Model\ProductFactory $productloader,
        \Bss\BundleOptionImage\Helper\Data $helper,
        array $data = []
    ) {
        $this->productloader = $productloader;
        $this->helper = $helper;
        $this->helperimage = $context->getImageHelper();
        parent::__construct(
            $context,
            $arrayUtils,
            $catalogProduct,
            $productPrice,
            $jsonEncoder,
            $localeFormat,
            $data
        );
    }

    public function getLoadProduct($id)
    {
        return $this->productloader->create()->load($id);
    }

    public function getOptionImage($_product, $type)
    {
        return $this->helperimage
                    ->init($_product,$type, ['height' => $this->getImageHeight(),'width'=> $this->getImageWidth()])
                    ->getUrl();
    }

    public function isEnabled()
    {
        return $this->helper->isEnabled();
    }

    public function getClassOption()
    {
        return $this->helper->getClassOption();
    }

    public function getImageHeight()
    {
        return $this->helper->getImageHeight();
    }

    public function getImageWidth()
    {
        return $this->helper->getImageWidth();
    }

    public function getNumberItemSlide()
    {
        return $this->helper->getNumberItemSlide();
    }

    public function getSpeedSlide()
    {
        return $this->helper->getSpeedSlide();
    }

    public function getSlideAuto()
    {
        return $this->helper->getSlideAuto();
    }
}
